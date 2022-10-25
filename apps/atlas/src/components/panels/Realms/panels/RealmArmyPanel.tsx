import useCountdown from '@bibliotheca-dao/core-lib/hooks/use-countdown';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CountdownTimer,
  InputNumber,
} from '@bibliotheca-dao/ui-lib/base';
import Relic from '@bibliotheca-dao/ui-lib/icons/relic.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArmyCard } from '@/components/cards/realms/ArmyCard';
import { Travel } from '@/components/panels/Realms/details/Travel';
import { ArmyBuilderSideBar } from '@/components/sidebars/ArmyBuilderSideBar';
import AtlasSidebar from '@/components/sidebars/AtlasSideBar';
import { CombatSideBar } from '@/components/sidebars/CombatSideBar';

import { RealmResources } from '@/components/tables/RealmResources';
import { defaultArmy } from '@/constants/army';
import { buildingIntegrity } from '@/constants/buildings';
import { useAtlasContext } from '@/context/AtlasContext';
import { useCommandList } from '@/context/CommandListContext';
import type { GetRealmQuery, Army, Realm } from '@/generated/graphql';
import { useArmy } from '@/hooks/settling/useArmy';
import useBuildings, {
  createBuildingCall,
} from '@/hooks/settling/useBuildings';
import useCombat from '@/hooks/settling/useCombat';
import { useGameConstants } from '@/hooks/settling/useGameConstants';
import { useGoblinTowns } from '@/hooks/settling/useGoblinTowns';
import useUsersRealms from '@/hooks/settling/useUsersRealms';
import useIsOwner from '@/hooks/useIsOwner';
import {
  CostBlock,
  fetchRealmNameById,
  hasOwnRelic,
  RealmCombatStatus,
} from '@/shared/Getters/Realm';
import SidebarHeader from '@/shared/SidebarHeader';
import type { BuildingDetail } from '@/types/index';
import { BaseRealmDetailPanel } from '../BaseRealmDetailPanel';
type Prop = {
  realm: GetRealmQuery['realm'];
  buildings: BuildingDetail[] | undefined;
  open: boolean;
  loading: boolean;
};

interface BuildQuantity {
  barracks: string;
  archerTower: string;
  castle: string;
  mageTower: string;
}

const RealmArmyPanel: React.FC<Prop> = (props) => {
  const router = useRouter();

  const { findRealmsAttackingArmies } = useArmy();

  const realm = props.realm;
  const { userData, userRealms } = useUsersRealms();

  const { build } = useBuildings(realm as Realm);

  const allArmies = findRealmsAttackingArmies(userRealms?.realms)?.filter(
    (a) => a.realmId !== realm.realmId
  );
  const {
    travelContext: { travel, setTravelArcs },
  } = useAtlasContext();
  const [selectedArmy, setSelectedArmy] = useState<Army>();

  const userArmiesAtLocation = userData.attackingArmies?.filter(
    (army) => army.destinationRealmId == realm.realmId
  );

  const { claim } = useGoblinTowns();

  const timeAttacked = realm?.lastAttacked
    ? new Date(parseInt(realm.lastAttacked)).getTime()
    : 0;

  const vaultCooldownMinutes = 30;
  const attackingCooldownMinutes = 10;

  const time = (timestamp: any, minutes: number) => {
    const cooldownSeconds = 60 * minutes;
    const t = timestamp ? new Date(parseInt(timestamp)).getTime() : 0;
    return (t + cooldownSeconds).toString();
  };

  const vaultCountdown = useCountdown({
    date: time(realm?.lastAttacked, vaultCooldownMinutes),
  });

  const [isRaiding, setIsRaiding] = useState(false);
  const [isArmyBuilding, setIsArmyBuilding] = useState(false);
  const [isTravel, setIsTravel] = useState(false);

  const txQueue = useCommandList();
  const isOwner = useIsOwner(realm?.settledOwner);

  const [buildQty, setBuildQty] = useState<BuildQuantity>({
    barracks: '1',
    archerTower: '1',
    castle: '1',
    mageTower: '1',
  });

  useEffect(() => {
    setBuildQty({
      barracks: '1',
      archerTower: '1',
      castle: '1',
      mageTower: '1',
    });
  }, [realm?.realmId]);

  const getMilitaryBuildingsBuilt = (
    buildings: BuildingDetail[] | undefined
  ) => {
    return buildings
      ?.filter((a) => a.type === 'military')
      .filter((b) => b.quantityBuilt > 0)
      .map((c) => c.id);
  };

  const buildNewArmy = () => {
    defaultArmy.realmId = realm.realmId;
    defaultArmy.armyId = realm.ownArmies.length;
    setSelectedArmy(defaultArmy);
  };

  return (
    <BaseRealmDetailPanel open={props.open}>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 sm:col-span-6 lg:col-start-1 lg:col-span-3">
          <CardBody>
            {hasOwnRelic(realm) ? (
              <div>
                <h2 className="mb-4">
                  {realm?.name} is a self-sovereign state
                </h2>
                <p className="text-xl">
                  Citizens of {realm?.name} are living peacefully on its lands.
                  The Lord of {realm?.name} is keeping them safe from Goblins
                  and other warmongering realms.
                </p>
              </div>
            ) : (
              <div>
                {realm?.relic?.map((a, i) => {
                  return (
                    <div key={i} className="mb-4">
                      <h2>
                        Annexed by Realm{' '}
                        {fetchRealmNameById(a.heldByRealm || 0)}
                      </h2>{' '}
                      <p className="text-xl">
                        {realm?.name} has been Conquered by
                        {fetchRealmNameById(a.heldByRealm || 0)}. The citizens
                        shake in fear everyday thinking it will be their last...
                        won't someone think of the children!
                      </p>
                      <div className="mt-4">
                        <Button
                          href={'/realm/' + a.heldByRealm + '?tab=Army'}
                          variant="outline"
                          size="sm"
                        >
                          Visit realm {a.heldByRealm}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardBody>
        </Card>
        <Card className="col-span-12 sm:col-span-6 lg:col-start-4 lg:col-end-8">
          <div className="text-2xl">
            {realm.name} rules a total of {realm.relicsOwned?.length} Realms
          </div>

          <CardBody>
            <div className="flex flex-wrap">
              {realm.relicsOwned?.map((a, i) => {
                return (
                  <div key={i} className="p-2 mb-4 ">
                    <Button
                      href={'/realm/' + a.realmId + '?tab=Army'}
                      variant="outline"
                      size="sm"
                    >
                      <Relic className={` w-3 mr-4 fill-yellow-500`} />{' '}
                      <h5>Realm {fetchRealmNameById(a.realmId || 0)}</h5>
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
        <Card
          loading={props.loading}
          className="col-span-12 md:col-start-8 md:col-end-13"
        >
          <CardTitle>Raidable Resources</CardTitle>
          <RealmResources
            realm={realm}
            loading={false}
            hideLordsClaimable
            showRaidable
          />

          {!isOwner && (
            <div className="w-full mt-3">
              <Button
                onClick={() => {
                  userArmiesAtLocation && userArmiesAtLocation.length
                    ? setIsRaiding(true)
                    : setIsTravel(true);
                }}
                size="lg"
                className="w-full"
                disabled={!vaultCountdown.expired}
                variant={'primary'}
              >
                {realm && RealmCombatStatus(realm)}
              </Button>
              <p className="p-3 text-center uppercase font-display">
                Pillage this vault for 25% of its resources.
              </p>
            </div>
          )}
        </Card>
        {isOwner && (
          <Card
            loading={props.loading}
            className="col-span-12 row-span-3 md:col-span-5"
          >
            <CardTitle>Military Buildings</CardTitle>
            <div className="flex flex-wrap">
              {props.buildings
                ?.filter((a) => a.type === 'military')
                .map((a, i) => {
                  return (
                    <div key={i} className="flex flex-wrap w-full ">
                      <div className="self-center p-1 ">
                        <Image
                          height={200}
                          width={200}
                          className="object-fill bg-white border rounded paper"
                          src={a.img}
                          alt=""
                        />
                      </div>

                      <div className="p-6 capitalize">
                        <h2>{a.name}</h2>
                        <div className="w-full text-xs font-semibold uppercase">
                          {(buildingIntegrity(a.id) / 60 / 60).toFixed(2)} hours
                          per building
                        </div>
                        <div className="flex flex-wrap my-5">
                          <div className="flex">
                            <p className="sm:text-4xl">{a.quantityBuilt}</p>

                            <div className="self-end">
                              <CountdownTimer
                                date={(a.buildingDecay * 1000).toString()}
                              />{' '}
                            </div>
                          </div>
                        </div>
                        <div className="relative flex w-full mt-3 space-x-2">
                          <Button
                            onClick={() =>
                              build({
                                realmId: realm.realmId,
                                buildingId: a.id,
                                qty: buildQty[a.key],
                                costs: {
                                  // Mimic ItemCost interface
                                  amount: 0,
                                  resources: a.cost,
                                },
                              })
                            }
                            className="w-full"
                            size="xs"
                            variant="primary"
                          >
                            build
                          </Button>
                          <InputNumber
                            value={buildQty[a.key]}
                            inputSize="sm"
                            colorScheme="transparent"
                            className="w-12 bg-white border rounded border-white/40"
                            min={1}
                            max={10}
                            stringMode
                            onChange={(value) => {
                              if (value) {
                                setBuildQty((current) => {
                                  return {
                                    ...current,
                                    [a.key]: value.toString(),
                                  };
                                });
                              }
                            }}
                          />{' '}
                        </div>
                        <div className="relative flex mt-4">
                          {a.cost &&
                            a.cost.map((b, i) => {
                              return (
                                <CostBlock
                                  key={i}
                                  resourceName={b.resourceName}
                                  amount={b.amount}
                                  id={b.resourceId}
                                  qty={buildQty[a.key]}
                                />
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        )}

        <Card
          loading={props.loading}
          className="col-span-12 lg:col-start-6 lg:col-span-7"
        >
          <div className="flex justify-between w-full">
            <CardTitle>Realm Armies</CardTitle>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {realm.ownArmies.map((army) => {
              return (
                <ArmyCard
                  onBuildArmy={() => {
                    setSelectedArmy(army);
                    setIsArmyBuilding(true);
                  }}
                  onTravel={() =>
                    travel(army.armyId, army.realmId, realm.realmId)
                  }
                  selectedRealm={realm.realmId}
                  key={army.armyId}
                  army={army}
                />
              );
            })}
            {isOwner && (
              <Card className="flex justify-center">
                <Button
                  onClick={() => {
                    buildNewArmy();
                    setIsArmyBuilding(true);
                  }}
                  variant="primary"
                  className="self-center"
                >
                  Summon New Army
                </Button>{' '}
              </Card>
            )}
          </div>
        </Card>
        <Card
          loading={props.loading}
          className="col-span-12 lg:col-start-6 lg:col-span-7"
        >
          <div className="flex justify-between w-full">
            <CardTitle>All Your Armies</CardTitle>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {allArmies?.map((army) => {
              return (
                <ArmyCard
                  onBuildArmy={() => {
                    router.push(`/realm/${realm.realmId}?tab=Army`, undefined, {
                      shallow: true,
                    });
                  }}
                  selectedRealm={realm.realmId}
                  onTravel={() =>
                    travel(army.armyId, army.realmId, realm.realmId)
                  }
                  key={army.armyId}
                  army={army}
                />
              );
            })}
          </div>
        </Card>
        {isOwner && (
          <Card className="col-span-12 md:col-start-6 md:col-end-13">
            <CardTitle>Goblins</CardTitle>
            <CardBody>
              Goblins emit Lords after defeating them. You must use your
              Attacking Army.
            </CardBody>
            <Button variant="primary" onClick={() => claim(realm.realmId)}>
              Attack Goblins
            </Button>
          </Card>
        )}
        <AtlasSidebar containerClassName="w-full" isOpen={isRaiding}>
          <SidebarHeader onClose={() => setIsRaiding(false)} />
          <CombatSideBar defendingRealm={realm} />
        </AtlasSidebar>
        <AtlasSidebar
          containerClassName="w-full md:w-10/12 z-[20]"
          isOpen={isArmyBuilding}
        >
          <SidebarHeader
            title={'Army Builder | ' + realm.name + ' | #' + realm.realmId}
            onClose={() => setIsArmyBuilding(false)}
          />
          <ArmyBuilderSideBar
            buildings={getMilitaryBuildingsBuilt(props.buildings)}
            army={selectedArmy}
          />
        </AtlasSidebar>
        <AtlasSidebar containerClassName="w-full md:w-3/4" isOpen={isTravel}>
          <SidebarHeader
            title={'Travel to Realm ' + realm.realmId}
            onClose={() => setIsTravel(false)}
          />
          <Travel realm={realm} />
        </AtlasSidebar>
      </div>
    </BaseRealmDetailPanel>
  );
};

export default RealmArmyPanel;
