import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, "name es undefined");

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await response.json();

  if (!pokemon) {
    throw new Response("No encontrado", { status: 404 });
  }

  const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const pokemonList = await listResponse.json();

  return json({ pokemon, pokemonList });
};

export default function PokemonDetail() {
  const { pokemon, pokemonList } = useLoaderData<typeof loader>();

  const currentIndex = pokemonList.results.findIndex((p: any) => p.name === pokemon.name);
  const prevPokemon = pokemonList.results[(currentIndex - 1 + pokemonList.results.length) % pokemonList.results.length];
  const nextPokemon = pokemonList.results[(currentIndex + 1) % pokemonList.results.length];

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((type: any) => type.type.name).join(', ')}</p>
      <div>
        <Link to={`/${prevPokemon.name}`}>Atrás</Link>
        <Link to={`/${nextPokemon.name}`}>Siguiente</Link>
      </div>
    </div>
  );
}
