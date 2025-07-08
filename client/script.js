$(document).ready(function () {
  // Scroll to hero button
  $(".hero-btn").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $(".features").offset().top,
      },
      1000
    );
  });

  // Animate cards on scroll
  function revealOnScroll() {
    $(".card").each(function () {
      var top_of_element = $(this).offset().top;
      var bottom_of_screen = $(window).scrollTop() + $(window).height();

      if (bottom_of_screen > top_of_element + 50) {
        $(this).addClass("animated fadeInUp");
      }
    });
  }

  $(window).on("scroll", revealOnScroll);

  // Handle image upload
  const uploadBox = $("#upload-box");
  const uploadInput = $("#image-upload");
  const feedBack = $("#upload-feedback");

  function uploadFiles(files) {
    if (files.length > 10) {
      feedBack.text("You can only upload up to 10 images at a time.");
      return;
    }

    const formData = new FormData();
    $.each(files, (i, file) => {
      formData.append("images", file);
    });

    $.ajax({
      url: "http://localhost:3000/upload",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: (res) => {
        feedBack.text(res.message);
        console.log("Upload response:", res);
      },
      error: (err) => {
        feedBack.text("Error uploading images. Please try again.");
        console.error("Upload error:", err);
      },
    });
  }
  uploadInput.on("change", function () {
    uploadFiles(this.files);
  });
  uploadBox.on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass("dragover");
  });
  uploadBox.on("dragleave drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass("dragover");
  });
  uploadBox.on("drop", function (e) {
    const droppedFiles = e.originalEvent.dataTransfer.files;
    uploadFiles(droppedFiles);
  });
});
