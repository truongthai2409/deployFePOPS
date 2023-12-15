let myChart = document.getElementById("myChart");
let myChart2D = myChart.getContext("2d");

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
let data_total_orders = [];
let data_total_product = [];

let chart_data = {};
let config = {};

// let chart_data = {};
// let config = {};

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const getDataRevenue = async () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
  });
  const result = await axiosInstance.post("/revenue/revenue");
  return result.data;
};
async function getData() {
  await getDataRevenue().then((data) => {
    // console.log(data)
    data_days = data.days;
    data_revenues = data.revenue_list;
    data_total_orders = data.total_order_list;
    data_total_product = data.product_quantity_list;

    chart_data = {
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
    config = {
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
          // console.log(index);
          // console.log(data_days[index]);
        },
      },
    };
    // const new_chart = new Chart(myChart2D, config);
  });
  // const result = await config;
  // console.log(config)
  return config;
}

async function firstAsyncFunction() {
  // Thực hiện công việc bất đồng bộ
  // console.log(getData())
  return getData();
}

async function secondAsyncFunction() {
  // Gọi hàm đầu tiên và chờ kết quả
  const result = await firstAsyncFunction();
  console.log(result);
  return (new_chart = new Chart(myChart2D, result));
  // Hàm này sẽ chỉ chạy khi firstAsyncFunction hoàn thành và trả về kết quả
}

// Gọi hàm thứ hai
secondAsyncFunction()
  .then((secondResult) => {
    // Hàm này sẽ chỉ chạy khi secondAsyncFunction hoàn thành và trả về kết quả
    // console.log(secondResult);
  })
  .catch((error) => {
    // Xử lý lỗi nếu có
    console.error(error);
  });

// firstAsyncFunction()
//   .then((result) => {
//     // Hàm này sẽ chạy khi firstAsyncFunction hoàn thành và trả về kết quả
//     console.log(result);

//     // Gọi hàm không phải là async ngay tại đây
//     return nonAsyncFunction();
//   })
//   .then((nonAsyncResult) => {
//     // Hàm này sẽ chạy khi nonAsyncFunction hoàn thành và trả về kết quả
//     console.log(nonAsyncResult);
//   })
//   .catch((error) => {
//     // Xử lý lỗi nếu có
//     console.error(error);
//   });

// config = {
//   type: "line",
//   data: chart_data,
//   options: {
//     plugins: {
//       title: {
//         display: true,
//         text: "Chart.js Stacked Line/Bar Chart",
//       },
//     },
//     scales: {
//       y: {
//         type: "linear",
//         display: true,
//         position: "left",
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "right",

//         // grid line settings
//         grid: {
//           drawOnChartArea: true, // only want the grid lines for one axis to show up
//         },
//       },
//     },
//     onClick: (e, indexList) => {
//       const index = indexList[0].index;
//       // console.log(index);
//       // console.log(data_days[index]);
//     },
//   },
// };

// const data1 = {
//   labels: ["Nhãn 1", "Nhãn 2", "Nhãn 3", "Nhãn 1", "Nhãn 2", "Nhãn 3", "123"],
//   datasets: [
//     {
//       label: "My First Dataset",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//         "rgba(255, 205, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(201, 203, 207, 0.2)",
//       ],
//       borderColor: [
//         "rgb(255, 99, 132)",
//         "rgb(255, 159, 64)",
//         "rgb(255, 205, 86)",
//         "rgb(75, 192, 192)",
//         "rgb(54, 162, 235)",
//         "rgb(153, 102, 255)",
//         "rgb(201, 203, 207)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const config1 = {
//   type: "bar",
//   data: data1,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// };

// const new_chart = new Chart(myChart2D, config);

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
      ////=============
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
      from = start.format("YYYY-MM-DD");
      to = end.format("YYYY-MM-DD");
      data_from_to = {
        "from": from,
        "to": to,
      };

      console.log(data_from_to);
      callApi(
        "http://localhost:4000/revenue/revenue",
        "GET",
        "application/json",
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
        console.log(response)
        handleSuccess(response);
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
  // labels: data_days
  // datasets : data_revenues
  data_revenues = data.revenue_list;
  data_total_orders = data.total_order_list;
  data_total_product = data.product_quantity_list;
  // secondAsyncFunction()
  //   .then((secondResult) => {
  //     // Hàm này sẽ chỉ chạy khi secondAsyncFunction hoàn thành và trả về kết quả
  //     console.log(secondResult);
  //   })
  //   .catch((error) => {
  //     // Xử lý lỗi nếu có
  //     console.error(error);
  //   });
  // upDateCanvas(data_days, data_revenues, data_total_orders, data_total_product);
  // removeData(new_chart)

  addData(new_chart, data_days, data_revenues);
  console.log(new_chart.data);
  // console.log(new_chart)
}

function handleError(error) {
  console.error("Lỗi:", error);
}
// function upDateCanvas( data_days, data_revenues ) {
//   addData()
// }

function removeData(chart) {
  chart.data.labels.pop();
  // chart.data.datasets.forEach((dataset) => {
  //   dataset.forEach((item)=>{
  //     item.data.pop()
  //   })
  // });
  // // chart.labels.forEach((label) => {
  // //   label = '';
  // // });
  // console.log(chart.data)
  chart.update();
}

function addData(chart, label, newData) {
  chart.data.labels.map((item) =>
    console.log(item)
    // console.log(label)
  );

  // console.log(chart.data.datasets)

  chart.data.datasets.forEach((dataset) => {
    // dataset.data.push(newData);
    console.log(dataset.data)
    // dataset.forEach((item) => {
    //   console.log(item.data);
    // });
  });
  chart.update();
}

// ============= list =====================
const getDataList = async (id) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
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
