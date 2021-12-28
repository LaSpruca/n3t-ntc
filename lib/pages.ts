enum Pages {
    Home,

    NotFound,
}

export default Pages;

export const pageMap: Record<string, Pages> = {
    '/': Pages.Home,
};

// All the pages that should have a floating sidebar;
export const floatingSideBarPages = [Pages.Home];
