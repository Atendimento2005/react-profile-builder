"use server"

import { cookies } from "next/headers"

export async function setCookie(
    key,
    value
){
    cookies().set(key, value);
}