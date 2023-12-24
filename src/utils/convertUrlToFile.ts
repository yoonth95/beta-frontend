const convertUrlToFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const filename = url.split("/show/")[1];
  const extention = url.split(".").pop();
  const metadata = { type: `image/${extention}` };
  return new File([data], filename, metadata);
};

export default convertUrlToFile;
