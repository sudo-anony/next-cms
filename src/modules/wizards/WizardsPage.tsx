import React from 'react';
import { PageLink, PageTitle } from '../../theme/layout/core';
import { Vertical } from './components/Vertical';
import { Horizontal } from './components/Horizontal';

const wizardsBreadCrumbs: Array<PageLink> = [
    {
        title: 'Wizards',
        path: '/crafted/pages/wizards/horizontal',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
];

const WizardsPage: React.FC = () => {
    return (
        <></>
        // <Routes>
        //     <Route
        //         path='/'
        //         element={
        //             <>
        //                 <PageTitle breadcrumbs={wizardsBreadCrumbs}>Horizontal</PageTitle>
        //                 <Horizontal />
        //             </>
        //         }
        //     />
        //     <Route
        //         path='vertical'
        //         element={
        //             <>
        //                 <PageTitle breadcrumbs={wizardsBreadCrumbs}>Vertical</PageTitle>
        //                 <Vertical />
        //             </>
        //         }
        //     />
        //     <Route index element={<Horizontal />} />
        // </Routes>
    );
};

export default WizardsPage;
