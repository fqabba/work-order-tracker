const fs = require("fs");

const data = fs.readFileSync("workOrders.json", "utf8");
let workOrders = JSON.parse(data);

function saveWorkOrders() {
    fs.writeFileSync(
        "workOrders.json",
        JSON.stringify(workOrders, null, 2)
    );
}

function removeDuplicates() {
    workOrders = workOrders.filter(function(workOrder, index, array) {
        return index === array.findIndex(function(item) {
            return item.id === workOrder.id;
        });
    });

    saveWorkOrders();
}

function addWorkOrder(id, machine, issue, priority, status) {
    const existingWorkOrder = workOrders.find(function(workOrder) {
        return workOrder.id === id;
    });

    if (existingWorkOrder) {
        console.log("Work Order ID already exists:", id);
        return;
    }

    const newWorkOrder = {
        id: id,
        machine: machine,
        issue: issue,
        priority: priority,
        status: status
    };

    workOrders.push(newWorkOrder);
    saveWorkOrders();
}

function findWorkOrder(id) {
    const result = workOrders.find(function(workOrder) {
        return workOrder.id === id;
    });

    if (result) {
        console.log("Search result:");
        console.log(result);
    } else {
        console.log("Work Order not found:", id);
    }
}

function updateStatus(id, newStatus) {
    const workOrder = workOrders.find(function(workOrder) {
        return workOrder.id === id;
    });

    if (workOrder) {
        workOrder.status = newStatus;
        saveWorkOrders();
    }
}

function deleteWorkOrder(id) {
    const index = workOrders.findIndex(function(workOrder) {
        return workOrder.id === id;
    });

    if (index !== -1) {
        workOrders.splice(index, 1);
        saveWorkOrders();
    }
}

function displayWorkOrders() {
    workOrders.forEach(function(workOrder) {
        console.log("Work Order ID:", workOrder.id);
        console.log("Machine:", workOrder.machine);
        console.log("Issue:", workOrder.issue);
        console.log("Priority:", workOrder.priority);
        console.log("Status:", workOrder.status);
        console.log("--------------------");
    });
}

removeDuplicates();

displayWorkOrders();