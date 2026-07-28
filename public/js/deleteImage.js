const deleteButtons = document.querySelectorAll(".delete-img");

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

        if (data.success) {
          location.reload();
        }    
  });

})