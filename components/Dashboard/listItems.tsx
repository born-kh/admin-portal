
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAVIGATOR } from '@utils/constants';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Assessment from '@material-ui/icons/Assessment';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Equalizer from '@material-ui/icons/Equalizer';
import * as MLink from '@material-ui/core/Link';
export const mainListItems = () => {
    const router = useRouter()
    const { userManager, tracerManager, documentManager, apiKeyManager, statistics } = NAVIGATOR


    return (
        <div>

            <Link href={userManager.path} passHref>

                <ListItem button selected={router.pathname.includes(userManager.path)}>
                    <ListItemIcon>
                        <SupervisedUserCircle />
                    </ListItemIcon>
                    <ListItemText primary={userManager.name} />
                </ListItem>

            </Link>


            <Link href={tracerManager.path} passHref>

                <ListItem button selected={router.pathname.includes(tracerManager.path)}>
                    <ListItemIcon>
                        <Assessment />
                    </ListItemIcon>
                    <ListItemText primary={tracerManager.name} />
                </ListItem>

            </Link>
            <Link href={documentManager.path} passHref>

                <ListItem button selected={router.pathname.includes(documentManager.path)}>
                    <ListItemIcon>
                        <AssignmentInd />
                    </ListItemIcon>
                    <ListItemText primary={documentManager.name} />
                </ListItem>

            </Link>
            <Link href={apiKeyManager.path} passHref>

                <ListItem button selected={router.pathname.includes(apiKeyManager.path)}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary={apiKeyManager.name} />
                </ListItem>

            </Link>
            <Link href={statistics.path} passHref >

                <ListItem button selected={router.pathname.includes(statistics.path)}>
                    <ListItemIcon>
                        <Equalizer />
                    </ListItemIcon>
                    <ListItemText primary={statistics.name} />
                </ListItem>

            </Link>

        </div>

    );
}

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Settings</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Auth Settings" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Backand Settings" />
        </ListItem>

    </div>
);