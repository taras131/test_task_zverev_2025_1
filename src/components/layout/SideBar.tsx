import {FC, useEffect} from "react";
import {Drawer, Stack, styled, useMediaQuery} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SideBarMenuItem from "./SideBarMenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import {Logo} from "./Logo";
import {routesConfig} from "../../config/routes";

interface IProps {
    open: boolean;
    handleDrawerClose: () => void;
}

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const SideBar: FC<IProps> = ({open, handleDrawerClose}) => {
    const matches_1200 = useMediaQuery("(min-width:1200px)");
    const {pathname} = useLocation();
    const menuItemList = routesConfig.filter(route => route.showInMenu)
        .map(route => (<SideBarMenuItem key={route.path} title={route.label || ""} path={route.path}/>));
    useEffect(() => {
        if (!matches_1200) {
            handleDrawerClose();
        }
    }, [pathname]);
    return (
        <Drawer
            sx={{
                "--SideNav-background": "var(--mui-palette-neutral-950)",
                "--SideNav-color": "var(--mui-palette-common-white)",
                "--NavItem-color": "var(--mui-palette-neutral-300)",
                "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
                "--NavItem-active-background": "var(--mui-palette-primary-main)",
                "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
                "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
                "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
                "--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
                "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
                color: "var(--SideNav-color)",
                width: "var(--SideNav-width)",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    backgroundColor: "#272e3d",
                    color: "white",
                    ...(matches_1200 && {
                        width: "var(--SideNav-width)",
                    }),
                },
            }}
            variant={matches_1200 ? "persistent" : "temporary"}
            anchor="left"
            open={open || matches_1200}
        >
            <DrawerHeader
                sx={{
                    alignItems: "center",
                    backgroundColor: "var(--mui-palette-neutral-950)",
                    border: "1px solid var(--mui-palette-neutral-700)",
                }}>
                <Stack direction={"row"}
                       justifyContent={"space-between"}
                       alignItems={"center"}
                       sx={{width: "var(--SideNav-width)", position: "relative"}}
                       spacing={2}>
                    <Box component={Link} to={routesConfig[0].path} sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontSize: "1.5rem",
                        color: "var(--NavItem-color)",
                        textDecoration: "none",
                        cursor: "pointer",
                    }}>
                        <Logo height={32} width={32}/>
                        Kosmoteros
                    </Box>
                    {!matches_1200 && (
                        <IconButton sx={{
                            color: "var(--NavItem-color)",
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                                    onClick={handleDrawerClose}>
                            <MenuIcon/>
                        </IconButton>
                    )}
                </Stack>
            </DrawerHeader>
            <Divider sx={{borderColor: "var(--mui-palette-neutral-700)"}}/>
            <Box component="nav"
                 sx={{flex: "1 1 auto", p: "12px"}}>
                {menuItemList}
            </Box>
        </Drawer>
    );
};

export default SideBar;

