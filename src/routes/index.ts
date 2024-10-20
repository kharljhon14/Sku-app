const paths = {
  homePath() {
    return '/';
  },
  authPath() {
    return '/auth';
  },
  skusPath() {
    return '/skus';
  },
  showSkuPath(skuId: string) {
    return `/skus/${skuId}`;
  },
  suppliersPath() {
    return '/suppliers';
  },
  showSupplierPath(supplierId: string) {
    return `/suppliers/${supplierId}`;
  }
};

export default paths;
