let myChart = document.getElementById("myChart");


let daterange = document.getElementById("daterange");
daterange.value = `${moment()
  .subtract(7, "days")
  .calendar()} - ${moment().format("L")}`;

let from = "";
let to = "";
let data_from_to = {
  from,
  to,
};

let data_days = [];
let data_revenues = [];
const getDataRevenue = async () => {
  const axiosInstance = axios.create({
    baseURL: "http://52.77.254.92:4000",
  });
  const result = await axiosInstance.get("/revenue/revenue");
  return result.data;
};

getDataRevenue().then((data) => {
  data_days = data.days;
  data_revenues = data.revenue_list;
  data_total_orders = data.total_order_list;
  data_total_product = data.product_quantity_list;

  let chart_data = {
    labels: data_days,
    datasets: [
      {
        label: "Revenues",
        data: data_revenues,
        borderColor: CHART_COLORS.red,
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        stack: "combined",
        type: "bar",
        yAxisID: "y",
      },
      {
        label: "Orders",
        data: data_total_orders,
        borderColor: CHART_COLORS.blue,
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
        stack: "combined",
        yAxisID: "y1",
      },
    ],
  };

  const config = {
    type: "line",
    data: chart_data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Stacked Line/Bar Chart",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: true, // only want the grid lines for one axis to show up
          },
        },
      },
      onClick: (e, indexList) => {
        const index = indexList[0].index;
        console.log(index);
        console.log(data_days[index]);
      },
    },
  };
  let myChart2D = myChart.getContext("2d");
  let new_chart = new Chart(myChart2D, config);
});

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

//============== calender ==============

$(document).ready(function () {
  $('input[name="daterange"]').daterangepicker();

  // Console.log mã nguồn của DateRangePicker
  // console.log($.fn.daterangepicker);
});
$(function () {
  $('input[name="datefilter"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear",
    },
  });

  $('input[name="datefilter"]').on(
    "apply.daterangepicker",
    function (ev, picker, start, end, label) {
      $(this).val(
        picker.startDate.format("MM/DD/YYYY") +
          " - " +
          picker.endDate.format("MM/DD/YYYY")
      );
      from = start.format("YYYY-MM-DD");
      to = end.format("YYYY-MM-DD");
      data_from_to = {
        from,
        to,
      };
      console.log(data_from_to);
    }
  );

  $('input[name="datefilter"]').on(
    "cancel.daterangepicker",
    function (ev, picker) {
      $(this).val("");
    }
  );
});
$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "rights",
    },
    function (start, end, label) {
      from = start.format("DD/MM/YYYY");
      to = end.format("DD/MM/YYYY");
      data_from_to = {
        from,
        to,
      };

      console.log(data_from_to);
      callApi(
        "http://52.77.254.92:4000/revenue/revenue",
        "GET",
        "text/plain",
        data_from_to,
        handleSuccess,
        handleError
      );
    }
  );
});
function callApi(
  url,
  method,
  contentType,
  data,
  successCallback,
  errorCallback
) {
  $.ajax({
    url: url,
    type: method,
    contentType: contentType,
    data: data,
    success: function (response) {
      if (successCallback) {
        successCallback(response);
      }
    },
    error: function (error) {
      if (errorCallback) {
        errorCallback(error);
      }
    },
  });
}
function handleSuccess(data) {
  console.log("Kết quả:", data);
  data_days = data.days;
  data_revenues = data.revenue_list;
  data_total_orders = data.total_order_list;
  data_total_product = data.product_quantity_list;
  upDateCanvas( data_days, data_revenues, data_total_orders, data_total_product );
}

function handleError(error) {
  console.error("Lỗi:", error);
}
function upDateCanvas( data_days, data_revenues, data_total_orders, data_total_product ) {
  let chart_data = {
    labels: data_days,
    datasets: [
      {
        label: "Revenues",
        data: data_revenues,
        borderColor: CHART_COLORS.red,
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        stack: "combined",
        type: "bar",
        yAxisID: "y",
      },
      {
        label: "Orders",
        data: data_total_orders,
        borderColor: CHART_COLORS.blue,
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
        stack: "combined",
        yAxisID: "y1",
      },
    ],
  };

  const config = {
    type: "line",
    data: chart_data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Stacked Line/Bar Chart",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: true, // only want the grid lines for one axis to show up
          },
        },
      },
      onClick: (e, indexList) => {
        const index = indexList[0].index;
        console.log(index);
        console.log(data_days[index]);
      },
    },
  };
  myChart.remove();
  let myChart2D = myChart.getContext("2d");
  // window.myChart2D.destroy();
  // myChart2D.clearRect(0, 0, myChart.width, myChart.height);
  // console.log(myChart2D.clearRect())
  // console.log(myChart2D.fillRect());
  let divChart = document.getElementById('divChart');
  let canvas = document.createAttribute('canvas');
  canvas.width = 400;
  canvas.height = 150;
  divChart.appendChild(canvas)
  // let 

  let new_chart = new Chart(myChart2D, config);
}
// ============= list =====================
const getDataList = async (id) => {
  const axiosInstance = axios.create({
    baseURL: "http://52.77.254.92:4000",
  });
  const result = await axiosInstance.get(`/revenue/invoice/${id}`);
  return result.data;
};

const showModal = document.querySelectorAll("#show-modal");
const data = document.querySelectorAll("#data");

//=======================
let addProducts = document.querySelector(".add-products"); //css animatio
let btnAddProducts = document.getElementById("addProducts"); //show model
let modalContentProduct = document.querySelector(".modal-dashboard-product");
let removeAddProducts = document.getElementById("turnOffAddProduct");
//display add product
for (const button of showModal) {
  button.addEventListener("click", () => {
    addProducts.style.display = "block";
    let productId = button.querySelector("#product_id").textContent;
    console.log(productId);
    getDataList(productId).then((data) => {
      console.log(data);
      // console.log(data.customer.full_name)
      const customer_name = document.getElementById("customer_name");
      const created_by = document.getElementById("created_by");
      const created_at = document.getElementById("created_at");
      const table = document.querySelector("table");
      const total = document.getElementById("total");
      // console.log(table);
      for (const product of data.product_list) {
        const row = document.createElement("tr");

        // Thêm cột tên sản phẩm
        const product_name_cell = document.createElement("td");
        product_name_cell.innerHTML = product.product_name;
        row.appendChild(product_name_cell);

        // Thêm cột số lượng
        const quantity_cell = document.createElement("td");
        quantity_cell.innerHTML = product.quantity;
        row.appendChild(quantity_cell);

        // Thêm cột giá
        const price_cell = document.createElement("td");
        price_cell.innerHTML = product.price;
        row.appendChild(price_cell);

        table.appendChild(row);
      }

      customer_name.innerHTML = `Customer: ${data.customer.full_name}`;
      created_by.innerHTML = `Sold By: ${data.created_by.full_name}`;
      created_at.innerText = moment(data.created_at).format(
        "DD/MM/YYYY - HH:mm:ss"
      );
      total.innerHTML = `${data.total} $`;
    });
  });
}
//Hidden add product
removeAddProducts.addEventListener("click", () => {
  performAnimationAndHide();
});

async function performAnimationAndHide() {
  // Sử dụng `await` để đợi kết thúc animation
  await new Promise((resolve) => {
    modalContentProduct.style.animation = "hidden-modal 0.6s ease";
    modalContentProduct.addEventListener("animationend", resolve);
  });

  // Sau khi animation hoàn thành, chạy câu lệnh `addProducts.style.display`
  addProducts.style.display = "none";
  modalContentProduct.style.animation = "appear-modal 1s ease";
}
