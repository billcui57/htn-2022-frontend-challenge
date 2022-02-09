import axios from "axios";
import { TEvent, EventID } from "@/types";

const list = async (): Promise<TEvent[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/events`);
  return response.data;
};

const get = async (id: EventID) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/events/${id.toString()}`)
  return response.data
}


export default { list, get }