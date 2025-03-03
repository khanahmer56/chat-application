import moment from "moment";

const fileFormat = (file) => {
  const fileExtension = file?.split(".").pop().toLowerCase();
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  )
    return "image";
  if (
    fileExtension === "mp4" ||
    fileExtension === "ogg" ||
    fileExtension === "webm"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  return "file";
};
const transformImage = (url = "", width) => url;

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = currentDate.clone().subtract(i, "days");
    last7Days.push(date.format("YYYY-MM-DD"));
  }
  return last7Days;
};
export { fileFormat, transformImage, getLast7Days };
