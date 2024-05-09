import React from "react";


export default function UserData(Blog){
const dateTime = Blog.data.toString();
const dates = dateTime.slice(0,10);
    return(
        <div>
        <table>
            <tbody>
                <tr>
                    <td>{Blog.title}</td>
                    <td>{dates}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}