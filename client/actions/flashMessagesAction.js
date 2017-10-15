import { ADD_FLASH_MESSAGE } from "./types";

export default function addFlashMessage(message) {
    return {
        type : ADD_FLASH_MESSAGE,
        message
    }
}