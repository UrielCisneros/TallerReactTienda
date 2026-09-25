export const CategoryFilter = ({ categories }) => {

    const ChipClass = "rounded-full border px-3.5 py-1.5 text-xs font-semibold trasition-all duration-200 cursor-pointer hover:scale-105 active:scale-95";

  return (
    <div className="flex flex-wrap gap-2 my-2">
    {categories.map((categorie) => {
        return (
           <button
            key={categorie}
            className={`${ChipClass} border-border bg-surfacetext-text-muted hover:border-border-strong hover:bg-surface-strong hover:text-text`}
           >
            {categorie}
           </button> 
        )
    })}
    </div>
  );
};
