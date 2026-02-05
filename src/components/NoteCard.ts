export default function NoteCard({ title, content, color = "yellow", tags = [] }: {
  title: string;
  content: string;
  color?: string;
  tags?: string[];
}) {
  const colors = {
    white: "bg-white",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    pink: "bg-pink-100",
    purple: "bg-purple-100",
  };

  return (
    <div className={`${colors[color as keyof typeof colors]} rounded-lg shadow-md p-6 max-w-md`}>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap mb-4">{content}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}