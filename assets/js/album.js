window.onload = function ()
{ // definir l'album, track_tableau

    //  ID API ou page SONG MARTINE keys
    

    let album = 112; //ID Martine

    
    let url = "http://api-music.test/api/albums/" + album;

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzEwMjU2ODIsImV4cCI6MTYzMTAyOTI4Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZGVtb0BkZW1vLmNvbSJ9.WErdRN6JSaSFPsIKXv0gKJAdOgZBpQKPefwva_eFFCjgtZYl5kK_QkpurGQfYX5YjdhDBak6wQKwJpUw-CalfwfQPr_SJFj60EthBlYkSOnYPSDD9miE6WhP0ou47eypuBJf7kTTgTB84CmIM-BvsIaDy5wUcAyl2da0DbP9UGvAsRymxyYj55FDCdk2di5XFlUWneUvDnlm9rZOQt3afhSl6jPmdfxs2TrnaXdBQqpRgGLm56eHu7kP77OL3cu6S6cZ2yJhuEzeckHN-IRJmxc76b383mBi-LW41-le2KfoT8ppBjyP3VlOiqA5-4u10dRTjz_vUvKSPEfrVmQakQgsKYG6NG_dHx181LlQnWhXRCsACLoi9z_bux3izIC4O4cfnxHD-Xye7nV1fIj2lv0lGwxYvv0BdGXrmbz95reHmJbY2usXW9DTMFwFWhV0t_bnYoVm-O3f5Af9QyW5YprvYvbvKfx-Ni6c6HG9Uye7zDbd5rtJf-3PhNxgNUB1mShVAjn_hltvTLoZ5Hf88BYEnB63V5zKIFgAvxMz7hbvL8BTDUiEeBoL6U_Ai5f8quU15GULSBmXy3ukYLSFCsmy84r-ykaw4Up8wdOSCQTLMBVMmnRnPoBQpv4MX16ZGjuMmI84qZPdo8ptoqGxg8WyO61tcJF-NRP6XHg1ziw"
    
    fetch (url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })


        .then(response => response.json())
        .then(post =>
            {
                console.log(post); /// boucler sur les tracks
                
            
           
            })

    

}

