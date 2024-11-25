import React, { useEffect, useState } from 'react';
function KiemTra(props) {
    let [fire, setFire] = useState([]);
    let [login, setLogin] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/tintuc')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));

        fetch('http://localhost:3000/checkvar', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setLogin(data);
            })
            .catch(error => console.error(error));
    }, []);
    if (login) {
        if (login.quyen == "nhanvien" && window.location.href == "http://localhost:5173/register") {
            window.location.href = "http://localhost:5173/home";
        }
        if (login.quyen == "admin") {
            return props.children;
        }
        return props.children;
    } else {
        if (window.location.href == "http://localhost:5173/register") {
            window.location.href = "http://localhost:5173/login";
        }
        if (window.location.href == "http://localhost:5173/post") {
            window.location.href = "http://localhost:5173/login";
        }
        if (window.location.href == "http://localhost:5173/quanlytintuc") {
            window.location.href = "http://localhost:5173/login";
        }
        if (window.location.href == "http://localhost:5173/quanlydanhmuc") {
            window.location.href = "http://localhost:5173/login";
        }
        for (let i = 0; i < fire.length; i++) {
            if (window.location.href == "http://localhost:5173/post/" + fire[i].ID) {
                window.location.href = "http://localhost:5173/login";
            }
        }
        return props.children;
    }
}

export default KiemTra;