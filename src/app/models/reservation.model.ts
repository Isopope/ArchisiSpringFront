import { Terrain } from "./terrain.model";
import { Utilisateur } from "./utilisateur.model";

export class Reservation {
    utilisateurId!: number;
    terrainId!: number;
    reservation!: number;
    utilisateur!: Utilisateur;
    terrain!: Terrain;
}
