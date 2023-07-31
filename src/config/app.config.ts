interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Stock Trader'],
  customerRoles: [],
  tenantRoles: ['Stock Trader'],
  tenantName: 'Organization',
  applicationName: 'Share Trading',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
