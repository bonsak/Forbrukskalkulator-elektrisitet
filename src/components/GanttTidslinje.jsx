import { useEffect, useRef, useState } from 'react';
// import 'dhtmlx-gantt';
import { gantt } from "dhtmlx-gantt";
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const GanttTidslinje = () => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    // Aktiver oppretting av nye tasks
    gantt.config.drag_create = {
      start_date: true,
      duration: true,
      mode: true
    };
    gantt.config.drag_resize = true;
    gantt.config.drag_progress = false;

    // Konfigurer hvordan dra-opprettede tasks skal se ut
    gantt.templates.grid_row_class = function(start, end, task){
      return "gridHover";
    };
    
    gantt.templates.task_row_class = function(start, end, task){
      return "taskRow";
    };

    // Legg til knapp for å lage ny task
    gantt.config.add_column = true;
    gantt.config.grid_width = 380;
    
    // Definer numeriske input typer med labels
    gantt.form_blocks["number"] = {
      render: function(sns) {
        return "<div class='gantt_cal_ltext'><label>" + sns.label + "</label><input type='number' /></div>";
      },
      set_value: function(node, value, task) {
        node.querySelector("input").value = value || "";
      },
      get_value: function(node, task) {
        return node.querySelector("input").value;
      }
    };

    // Konfigurer kolonner
    gantt.config.columns = [
      { 
        name: "add",
        label: "",
        width: 44,
        align: "left",
        template: function(task) {
          return "<div class='gantt-add-btn'></div>";
        }
      },
      { name: "text", label: "Task name", tree: true, width: 200 },
      { 
        name: "watt", 
        label: "Watt", 
        width: 80, 
        align: "center",
        template: function(task) {
          return task.watt || "";
        }
      },
      { 
        name: "size", 
        label: "Size", 
        width: 80, 
        align: "center",
        template: function(task) {
          return task.size || "";
        }
      }
    ];

    // Legg til CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .gantt-add-btn {
        width: 20px;
        height: 40px;
        border-radius: 50%;
        background: #2196F3;
        position: relative;
        cursor: pointer;
        margin: 0 auto;
      }
      .gantt-add-btn:hover {
        background: #1976D2;
      }
      .gantt-add-btn::before,
      .gantt-add-btn::after {
        content: '';
        position: absolute;
        background: white;
      }
      .gantt-add-btn::before {
        width: 2px;
        height: 20px;
        top: 5px;
        left: 9px;
      }
      .gantt-add-btn::after {
        width: 10px;
        height: 2px;
        top: 9px;
        left: 5px;
      }
      .taskRow:hover {
        background-color: #f0f0f0;
      }
    `;
    document.head.appendChild(style);

    // Konfigurer tidsskala
    gantt.config.duration_unit = "hour";
    gantt.config.duration_step = 1;
    gantt.config.scale_unit = "hour";
    gantt.config.date_scale = "%H:00";
    gantt.config.min_column_width = 25;
    
    // Sett start og slutt tid for visningen
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setHours(24, 0, 0, 0);

    gantt.config.start_date = today;
    gantt.config.end_date = endDate;

    // Konfigurer skala detaljer
    gantt.config.scale_height = 50;
    gantt.config.scales = [
      { unit: "hour", step: 1, format: "%H:00" }
    ];

    // Aktiver dra-oppretting i timeline
    gantt.config.show_chart = true;
    gantt.config.read_only = false;
    gantt.config.drag_links = false;
    
    // Tillat dobbeltklikk for å lage nye tasks
    gantt.config.dblclick_create = true;

    // Default 24 timer for nye oppgaver
    gantt.templates.task_time = function(start, end, task) {
      if (!task.duration) {
        task.duration = 1;
      }
      return '';
    };

    // Oppdatert lightbox
    gantt.config.lightbox.sections = [
      { 
        name: "description", 
        height: 38, 
        map_to: "text", 
        type: "textarea", 
        focus: true,
        label: "Task name"
      },
      { 
        name: "watt", 
        height: 22, 
        map_to: "watt", 
        type: "number", 
        min: 0,
        label: "Watt"
      },
      { 
        name: "size", 
        height: 22, 
        map_to: "size", 
        type: "number", 
        min: 0,
        label: "Size"
      }
    ];

    // Sett lokaliserte labels
    gantt.locale.labels.section_description = "Task name";
    gantt.locale.labels.section_watt = "Watt";
    gantt.locale.labels.section_size = "Size";

    // Hindre at tasks kan gå utenfor 24-timers perioden
    gantt.attachEvent("onTaskDrag", function(id, mode, task, original) {
      const taskStart = task.start_date;
      const taskEnd = task.end_date;
      
      if (taskStart < today || taskEnd > endDate) {
        return false;
      }
      return true;
    });

    // Event listener for klikk på + knappen
    gantt.attachEvent("onGridHeaderClick", function(column, e) {
      if (column === "add") {
        const task = {
          id: gantt.uid(),
          text: "New Task",
          start_date: today,
          duration: 1,
          watt: 200,
          size: 1
        };
        gantt.addTask(task);
        gantt.showLightbox(task.id);
      }
    });

    // Event listener for nye oppgaver
    gantt.attachEvent("onTaskCreated", function(task) {
      task.duration = 1;
      task.watt = 200;
      task.size = 1;
      return true;
    });

    // Initialiser med sample data
    const data = {
      data: [
        { 
          id: 1, 
          text: "Task 1", 
          start_date: today, 
          duration: 1,
          watt: 100,
          size: 50
        }
      ]
    };

    gantt.init(ganttContainer.current);
    gantt.parse(data);

    return () => {
      gantt.clearAll();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      ref={ganttContainer}
      style={{ width: '100%', height: '500px' }}
    />
  );
};


export default GanttTidslinje;