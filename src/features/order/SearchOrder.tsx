import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
 
  function handleSubmit(e: FormEvent){
    e.preventDefault();
    if(!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus: ring-yellow-500 focus: ring-opacity-50"
        />
    </form>
  );
}
