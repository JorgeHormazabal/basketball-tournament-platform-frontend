import { useClubStore } from "./useClubStore";
import { useDivisionStore } from "./useDivisionStore";
import { useEquipoStore } from "./useEquipoStore";
import { useEstadisticaJugadorStore } from "./useEstadisticaJugadores";
import { useEstadisticaLigaEquipoStore } from "./useEstadisticaLigaEquipoStore";
import { useJugadorStore } from "./useJugadorStore";
import { useLigaStore } from "./useLigaStore";
import { useOrganizadorStore } from "./useOrganizadorStore";
import { usePartidoStore } from "./usePartidoStore";

export const useCleanStore = () => {
  const { limpiarClub } = useClubStore();
  const { limpiarDivision } = useDivisionStore();
  const { limpiarEquipo } = useEquipoStore();
  const { limpiarEstadisticasJugadores } = useEstadisticaJugadorStore();
  const { limpiarEstadisticasDeLiga } = useEstadisticaLigaEquipoStore();
  const { limpiarJugador } = useJugadorStore();
  const { limpiarLiga } = useLigaStore();
  const { limpiarOrganizador } = useOrganizadorStore();
  const { limpiarPartido } = usePartidoStore();

  const limpiarStores = () => {
    limpiarClub();
    limpiarDivision();
    limpiarEquipo();
    limpiarEstadisticasDeLiga();
    limpiarEstadisticasJugadores();
    limpiarJugador();
    limpiarLiga();
    limpiarOrganizador();
    limpiarPartido();
  };

  return { limpiarStores };
};
