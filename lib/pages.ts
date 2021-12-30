enum Pages {
    Home,
    Map,
    DownloadReport,
    UserDocs,
    NotFound,
}

export default Pages;

export const pageMap: Record<string, Pages> = {
    '/': Pages.Home,
    '/map': Pages.Map,
    '/report': Pages.DownloadReport,
    '/docs': Pages.UserDocs,
};

export const pageTitle: Record<Pages, string> = {
    [Pages.Home]: 'Login',
    [Pages.Map]: 'Map View',
    [Pages.DownloadReport]: 'Download Report',
    [Pages.UserDocs]: 'Documentation',
    [Pages.NotFound]: 'Not found',
};

// All the pages that should have a floating sidebar;
export const floatingSideBarPages = [Pages.Map];
