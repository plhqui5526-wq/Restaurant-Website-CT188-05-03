const floors = {
  1: [
    { id: 'T01', status: 'available' },
    { id: 'T02', status: 'reserved' },
    { id: 'T03', status: 'available' },
    { id: 'T04', status: 'ondine' },
    { id: 'T05', status: 'available' },
    { id: 'T06', status: 'available' },

    { id: 'T07', status: 'available' },
    { id: 'T08', status: 'available' },
    { id: 'T09', status: 'reserved' },
    { id: 'T10', status: 'available' },
    { id: 'T11', status: 'ondine' },
    { id: 'T12', status: 'available' }
  ],

  2: [
    { id: 'A01', status: 'available' },
    { id: 'A02', status: 'reserved' },
    { id: 'A03', status: 'available' },
    { id: 'A04', status: 'ondine' },
    { id: 'A05', status: 'available' },

    { id: 'A06', status: 'available' },
    { id: 'A07', status: 'reserved' },
    { id: 'A08', status: 'available' },
    { id: 'A09', status: 'available' },
    { id: 'A10', status: 'ondine' }
  ]
};

let currentFloor = 1;

let currentSelectedTableId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderTableGrid();

  document.getElementById('floorSelect').addEventListener('change', (e) => {
    currentFloor = e.target.value;
    renderTableGrid();
  });
});

function renderTableGrid() {
  const tableGrid = document.getElementById('tableGrid');
  tableGrid.innerHTML = '';

  if (currentFloor == 1) {
    tableGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
  } else {
    tableGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  }

  floors[currentFloor].forEach(table => {
    const tableWrap = document.createElement('div');
    tableWrap.className = `table-wrap ${table.status}`;
    
    tableWrap.onclick = () => handleTableClick(table.id, table.status);

    tableWrap.innerHTML = `
      <div class="middle">
        <div class="chair"></div>
        <div class="chair"></div>
      </div>
      <div class="table-box">
        ${table.id}
      </div>
      <div class="middle">
        <div class="chair"></div>
        <div class="chair"></div>
      </div>
    `;

    tableGrid.appendChild(tableWrap);
  });
}

function handleTableClick(tableId, status) {
  if (status !== 'available') {
    alert(`Bàn ${tableId} hiện không trống (Trạng thái: ${status}). Vui lòng chọn bàn khác!`);
    return;
  }

  currentSelectedTableId = tableId;
  document.getElementById('tableInfo').value = tableId;
  document.getElementById('bookingModal').classList.add('show');
}


function closeModal() {
  document.getElementById('bookingModal').classList.remove('show');
  document.getElementById('custName').value = '';
  document.getElementById('custPhone').value = '';
  currentSelectedTableId = null;
}



function confirmBooking() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();

  if (!name || !phone || !email) {
  alert("Vui lòng điền đầy đủ thông tin!");
  return;
}
 
const tableIndex = floors[currentFloor].findIndex(t => t.id === currentSelectedTableId);
if (tableIndex > -1) {
  floors[currentFloor][tableIndex].status = 'reserved';
}

  addToReservationHistory(name, phone, currentSelectedTableId);

  renderTableGrid();


  closeModal();
  alert(`Đặt bàn ${currentSelectedTableId} thành công cho khách hàng ${name}!`);
}


function addToReservationHistory(name, phone, tableId) {
  const resList = document.getElementById('resList');
  

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const historyItem = document.createElement('div');
  historyItem.className = 'res-item';
  historyItem.innerHTML = `
    <strong>Bàn: ${tableId}</strong>
    Khách: ${name}<br>
    SĐT: ${phone}<br>
    <span style="font-size: 11px; color: #64748b; margin-top: 5px; display: inline-block;">
      ⏰ Đặt lúc: ${timeString}
    </span>
  `;


  resList.prepend(historyItem);
}