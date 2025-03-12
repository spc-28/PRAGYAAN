import { atom } from "recoil";

export const user = atom({
    key: 'User',
    default: {},
});

export const fetchStatus = atom({
    key: 'fetchStatus',
    default: false
})