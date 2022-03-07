type Props = {
  onClick: (event: any, id: string) => void;
  onChange: (event: any) => void;
  onSelectChange: (event: any) => void;
  value: number;
  select: string;
};

export const FlyTo = (props: Props) => {
  return (
    <div className="absolute z-10 flex w-full h-10 px-4 text-xl bottom-16 sm:top-10 sm:right-36 sm:z-30 sm:w-96">
      <input
        placeholder="Type Id"
        type={"number"}
        className="w-3/12 px-4 py-4 text-black rounded-l-xl bg-white/80"
        value={props.value}
        onChange={props.onChange}
        min="1"
        max={props.select === "B" ? "9000" : "8000"}
      />
      <button
        className="w-4/12 p-1 px-4 uppercase transition-all duration-300 text-off-100 bg-off-200/20 hover:bg-off-200/60"
        /* @ts-ignore: name not exist on D */
        onClick={() => props.onClick(props.value, props.select)}
      >
        Fly to
      </button>

      <select
        className="w-5/12 p-1 px-4 mr-2 uppercase transition-all duration-300 cursor-pointer text-off-100 bg-off-200/50 rounded-r-xl font-display"
        value={props.select}
        /* @ts-ignore: name not exist on D */
        onChange={(event) => props.onSelectChange(event.target.value)}
      >
        <option value={"A"}>Realm</option>
        <option value={"B"}>C&C</option>
        <option value={"C"}>Loot</option>
      </select>
    </div>
  );
};
