console.log("deleteImage.js loaded");
const deleteButtons = document.querySelectorAll(".delete-img");

console.log(deleteButtons);
console.log(deleteButtons.length);

deleteButtons.forEach((button) => {

  button.addEventListener("click", async() => {

    const id = button.dataset.id;
    const filename = button.dataset.filename;
    
    const response = await fetch(`/listings/${id}/images`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filename:filename,
      }),
    });
    
     const data = await response.json();

        console.log(data);

        if (data.success) {
          location.reload();
        }    
  });

})