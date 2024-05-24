<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Object Detection</title>
  <!-- font-awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Your custom CSS -->
  <link rel="stylesheet" href="/css/lots.css">
  <script src="/js/active.js"></script>
</head>

<body>
  <div class="header">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" onclick="window.location.href = './index.html'; return false;" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src="KT-Food.ico" class="icon" alt="icon">
        <span class="namecom fs-4">บริษัท กรุงไทยอาหาร จำกัด (มหาชน)</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href="/html/index.html" class="nav-link">หน้าหลัก</a></li>
        <li class="nav-item"><a href="/html/lot.php" class="nav-link">เช็คล็อต</a></li>
        <li class="nav-item"><a href="/html/createlot.html" class="nav-link">สร้างล็อต</a></li>
        <li class="nav-item"><a href="#" class="nav-link" onclick="logout()">logout</a></li>
      </ul>
    </header>
  </div>

  <section class="container">

    <div class="input-group">
      <input id="searchInput" type="search" class="form-control" placeholder="Search..." aria-label="Search">
      <div class="input-group-append">
        <button id="searchButton" class="btn btn-outline-primary" type="button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <div class="row mt-5 ">
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="/html/check_all.html" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 ">
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <img src="/img/frame_2024-05-18_16-48-14.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">สถานะ : โสด</h5>
            <h5 class="card-second">ชื่อ : ล๋อตเตอรี่</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item disabled">
          <span class="page-link">Previous</span>
        </li>
        <!-- ลูปเพื่อสร้างรายการหน้า -->
        <?php for ($i = 1; $i <= 5; $i++) { ?>

          <li class="page-item <?php echo ($i == $current_page) ? 'active' : ''; ?>">
            <a class="page-link" href="#"><?php echo $i; ?></a>
          </li>
        <?php } ?>
        <!-- จบลูป -->
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>

  </section>

  <footer class="footer">
    <div class="d-flex flex-wrap justify-content-center py-4 mt-5 border-bottom">
      <span class="text">Copyright &copy; 2024 บริษัท กรุงไทยอาหาร จำกัด (มหาชน).</span>
    </div>
  </footer>

</body>

</html>