import { useState } from "react";

const Expand = ({ text }: { text: string | undefined }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? text
    : text?.split(" ").slice(0, 32).join(" ") + " ...";

  return (
    <div className=" space-y-2">
      <p>
        {displayText}
        <button className="ml-2  text-gray-500" onClick={toggleExpansion}>
          {isExpanded ? "show less" : "show more"}
        </button>
      </p>
    </div>
  );
};

export default Expand;
