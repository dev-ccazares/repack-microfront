const Share = {
  open: () => Promise.resolve({ success: true }),
  shareSingle: () => Promise.resolve({ success: true }),
  isPackageInstalled: () => Promise.resolve(false),
};
export default Share;
