#!/usr/bin/env bun

import fetch from "node-fetch";

const [, , ...args] = process.argv;
const pokemonName = args[0]?.toLowerCase();

if (!pokemonName) {
    console.log("Usage: pokemon <name>");
    process.exit(1);
}

async function getPokemon(name) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) {
            console.log(`Pokemon "${name}" not found!`);
            return;
        }

        const data = await res.json();

        console.log(`\nPokemon:  ${data.name.toUpperCase()}`);
        console.log(`ID: ${data.id}`);
        console.log(
            `Type(s): ${data.types.map((t) => t.type.name).join(", ")}`,
        );
        console.log(
            `Abilities: ${data.abilities.map((a) => a.ability.name).join(", ")}`,
        );
        console.log("Stats:");
        data.stats.forEach((s) => {
            console.log(`  ${s.stat.name}: ${s.base_stat}`);
        });
        console.log(`\nSprite: ${data.sprites.front_default}`);
    } catch (err) {
        console.error("Error fetching Pokemon:", err.message);
    }
}

getPokemon(pokemonName);
