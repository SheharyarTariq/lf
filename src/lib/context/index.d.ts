declare module './index' {
    export function setOpenConfigurator(dispatch: any, value: boolean): void;
    export function setOpenSidenav(dispatch: any, value: boolean): void;
    export function useMaterialTailwindController(): [any, any];
    export function setSidenavColor(dispatch: any, value: string): void;
    export function setSidenavType(dispatch: any, value: string): void;
    export function setFixedNavbar(dispatch: any, value: boolean): void;
    export const MaterialTailwindControllerProvider: React.FC<{ children: React.ReactNode }>;

}
