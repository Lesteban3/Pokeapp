import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const pokemonlist = await fetch("https://pokeapi.co/api/v2/pokemon/");
  return json(await pokemonlist.json());
};

export default function PokeList() {
  const list = useLoaderData<typeof loader>();

  return (
    <ul>
      {list.results.map((element: any) => (
        <li key={element.url}>
          <Link to={`/pokelist/${element.name}`}>{element.name}</Link>
        </li>
      ))}
    </ul>
  );
}
