import client from "./client";

const endPoint = "post/MILLIEANKIT";

const getListings = () => client.get(endPoint);

const addListings = () => {
  const data = new FormData();

  // data.append("chatnumber", 'ASJKDFDF535ASDV');
  data.append("sender_id", "listing.senderId");
  data.append("receiver_id", "listing.userId");
  data.append("message", "listing.message");

  return client.post(endPoint, data);
};

const sendMessages = async () => {
  try {
    let response = await fetch("https://2a672d163266.ngrok.io/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unique: "OURMILLIE",
        messages: {
          sender_id: "AAAAAAAAAAAAAAAAAA",
          receiver_id: "MILLIEEEEEEEEE",
          message: "millie loves ankit",
        },
      }),
    });
    // let json = await response.json();
    // return json;
  } catch (error) {
    console.error(error);
  }
};

export default {
  addListings,
  getListings,
  sendMessages,
};
