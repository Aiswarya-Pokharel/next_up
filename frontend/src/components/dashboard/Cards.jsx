const cardList = [
  { id: 1, title: "Total Tasks", description: "" },
  { id: 2, title: "Completed Tasks", description: "" },
  { id: 3, title: "In Progress", description: "" },
];

export default function Cards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cardList.map((card) => (
        <div
          key={card.id}
          className="bg-primary/30 dark:bg-gray-800 shadow-lg cursor-pointer rounded-md p-4"
        >
          <h3 className="text-lg font-semibold text-logo dark:text-white">
            {card.title}
          </h3>
          <p className="text-content dark:text-gray-400">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
