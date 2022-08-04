import { useContract } from '@starknet-react/core';
import type { Abi } from 'starknet';

import Nexus from '@/abi/nexus/SingleSidedStaking.json';
import Splitter from '@/abi/nexus/Splitter.json';
import Exchange from '@/abi/settling/Exchange_ERC20_1155.json';
import Settling from '@/abi/settling/L01_Settling.json';
import Resources from '@/abi/settling/L02_Resources.json';
import Building from '@/abi/settling/L03_Building.json';
import Wonder from '@/abi/settling/L05_Wonders.json';
import Combat from '@/abi/settling/L06_Combat.json';
import Lords from '@/abi/settling/Lords_ERC20_Mintable.json';
import Realms721 from '@/abi/settling/Realms_ERC721_Mintable.json';
import Resources1155 from '@/abi/settling/Resources_ERC1155_Mintable_Burnable.json';

// Note: Can use process.env | static definition if needed
// Lords: process.env.LORDS_ADDR | "0x..."
export const ModuleAddr = {
  Lords: '0x0448549cccff35dc6d5df90efceda3123e4cec9fa2faff21d392c4a92e95493c',
  ResourceGame:
    '0x06f0e13b23b610534484e8347f78312af6c11cced04e34bd124956a915e5c881',
  Realms: '0x076bb5a142fa1d9c5d3a46eefaec38cc32b44e093432b1eb46466ea124f848a5',
  StakedRealms:
    '0x06f798682fc548e98a9556b624eb110f1bc37eeadd16bc2f49056f8ede7993c5',
  Settling:
    '0x03d4ac75998ac3205f4722a0ea385f09f3c8175ea544a63d55d93f7e3736c18b',
  Exchange:
    '0x015eba242880374267dc54900b7d569a964fcd8d251a2edfb66a4ec9a78eaedc',
  ResourcesToken:
    '0x07144f39e676656e81d482dc2cc9f68c98d768fe1beaad28438b43142cc9ff9e',
  Building:
    '0x07e6ef6eae7a6d03baaace2fe8b5747ed52fa6c7ae615f3e3bd3311ac98d139a',
  Combat: '0x0139bad2b0b220d71ea1fc48fa2858e993b3d471a3b03be609c54ff0c9795d71',
  Wonder: '0x0096cae38dd01a1e381c9e57db09669298fa079cfdb45e1a429c4020a6515549',
  Nexus: '0x0259f9adda2c8a7e651d03472cb603ef2c69ae9a64fd3a553415d082ddbb3061',
  Splitter:
    '0x06a60b479e9fe080fd8e0a8c4965040a25e276889c2de0cf105c410d0ac81436',
};

/**
 * Load the Nexus contract.
 * @returns The `Settling` contract or undefined.
 */
export function useNexusContract() {
  return useContract({
    abi: Nexus as Abi,
    address: ModuleAddr.Nexus,
  });
}

/**
 * Load the Splitter contract.
 * @returns The `Settling` contract or undefined.
 */
export function useSplitterContract() {
  return useContract({
    abi: Splitter as Abi,
    address: ModuleAddr.Splitter,
  });
}
/**
 * Load the Realms Settling contract.
 * @returns The `Settling` contract or undefined.
 */
export function useSettlingContract() {
  return useContract({
    abi: Settling as Abi,
    address: ModuleAddr.Settling,
  });
}

/**
 * Load the Realms Resources contract.
 * @returns The `Resources` contract or undefined.
 */
export function useResourcesContract() {
  return useContract({
    abi: Resources as Abi,
    address: ModuleAddr.ResourceGame,
  });
}

/**
 * Load the Realms Buildings contract.
 * @returns The `Buildings` contract or undefined.
 */
export function useBuildingContract() {
  return useContract({
    abi: Building as Abi,
    address: ModuleAddr.Building,
  });
}

/**
 * Load the Realms Wonder contract.
 * @returns The `Wonder` contract or undefined.
 */
export function useWonderContract() {
  return useContract({
    abi: Wonder as Abi,
    address: ModuleAddr.Wonder,
  });
}

/**
 * Load the Realms Combat contract.
 * @returns The `Combat` contract or undefined.
 */
export function useCombatContract() {
  return useContract({
    abi: Combat as Abi,
    address: ModuleAddr.Combat,
  });
}

/**
 * Load the Realms Resources ERC1155 contract.
 * @returns The `Resources` contract or undefined.
 */
export function useResources1155Contract() {
  return useContract({
    abi: Resources1155 as Abi,
    address: ModuleAddr.ResourcesToken,
  });
}

/**
 * Load the Lords ERC20 contract.
 * @returns The `Resources` contract or undefined.
 */
export function useLordsContract() {
  return useContract({
    abi: Lords as Abi,
    address: ModuleAddr.Lords,
  });
}
/**
 * Load the Realms Resources ERC721 contract.
 * @returns The `Realms` contract or undefined.
 */
export function useRealms721Contract() {
  return useContract({
    abi: Realms721 as Abi,
    address: ModuleAddr.Realms,
  });
}

/**
 * Load the Exchange ERC20_1155 contract.
 * @returns The `Exchange` contract or undefined.
 */
export function useExchangeContract() {
  return useContract({
    abi: Exchange as Abi,
    address: ModuleAddr.Exchange,
  });
}
