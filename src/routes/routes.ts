interface IRoute {
  path: string;
  text: string;
}

export const routes: IRoute[] = [
  {
    path: "/",
    text: "Inicio",
  },
  {
    path: "/partidas",
    text: "Partidas",
  },
  {
    path: "/perfil",
    text: "Perfil",
  },
]