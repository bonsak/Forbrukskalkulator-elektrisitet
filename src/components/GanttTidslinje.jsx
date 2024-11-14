import { useEffect, useRef, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import styled from 'styled-components'
import '../style/gantt.css'

const GanttTidslinje = () => {
  const ganttContainer = useRef(null)

  useEffect(() => {
    gantt.plugins({
      click_drag: true,
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(24, 0, 0, 0)

    const ganttConfig = {
      lightbox: {
        sections: [
          {
            name: 'description',
            height: 38,
            map_to: 'text',
            type: 'textarea',
            focus: true,
          },
          {
            name: 'watt_size',
            type: 'watt_size',
            map_to: 'auto',
            height: 45,
            label: ' ',
          },
        ],
      },
      click_drag: {
        callback: onDragEnd,
        singleRow: false,
      },
      show_grid: false,
      show_task_cells: false,
      drag_resize: true,
      drag_move: true,
      order_branch: true,
      order_branch_free: true,
      drag_progress: false,
      drag_timeline: {
        move: true,
        resize: true,
        progress: false,
      },
      duration_unit: 'hour',
      duration_step: 1,
      min_column_width: 25,
      start_date: today,
      end_date: endDate,
      row_height: 40,
      scale_height: 50,
      scales: [{ unit: 'hour', step: 1, format: '%H' }],
      show_chart: true,
      read_only: false,
      drag_links: false,
      dblclick_create: true,
      open_split_tasks: true,
      overlap_text: true,
    }

    Object.assign(gantt.config, ganttConfig)

    // Hindre at tasks kan gå utenfor 24-timers perioden
    gantt.attachEvent('onTaskDrag', function (task) {
      const taskStart = task.start_date
      const taskEnd = task.end_date

      if (taskStart < today || taskEnd > endDate) {
        return false
      }
      return true
    })

    gantt.attachEvent('onKeyDown', function (e) {
      console.log(e.keyCode)
      if (e.keyCode == 46) {
        // Delete-tasten
        const selectedId = gantt.getSelectedId()
        if (selectedId) {
          gantt.deleteTask(selectedId)
        }
        return true
      }
      return true
    })

    // Initialiser med sample data
    const data = {
      data: [
        createNewTask(
          new Date(new Date().setHours(8, 0, 0)),
          new Date(new Date().setHours(10, 0, 0))
        ),
      ],
    }

    gantt.init(ganttContainer.current)
    gantt.parse(data)

    // Sett labels for feltene
    gantt.locale.labels.section_description = 'Beskrivelse'
    // gantt.locale.labels.section_time = 'Tid'
    gantt.locale.labels.section_watt = 'Watt'
    gantt.locale.labels.section_size = 'Størrelse'

    ganttContainer.current.ondblclick = function (e) {
      const pos = gantt.getScrollState()
      const posx = e.clientX - ganttContainer.current.offsetLeft + pos.x
      const taskId = gantt.locate(e)
      // const rowIndex = gantt.getTaskRowIndex(taskId) // Henter rad-indeksen
      // console.log('Klikket:', ganttContainer.current) // Logger rad-nummeret

      if (!taskId) {
        // Klikk på tom område - lag ny task
        const rawDate = gantt.dateFromPos(posx)
        // Rund av til nærmeste time
        const roundedDate = new Date(rawDate)
        roundedDate.setMinutes(30)
        if (roundedDate < rawDate) {
          roundedDate.setHours(roundedDate.getHours() + 1)
        }
        roundedDate.setMinutes(0)

        const task = createNewTask(
          roundedDate,
          new Date(roundedDate.getTime() + 60 * 60 * 1000)
        )
        task.id = gantt.uid()

        // Legg til en lytter for lightbox_save før vi viser lightbox
        const onSave = gantt.attachEvent('onLightboxSave', function (id, item) {
          gantt.detachEvent(onSave) // Fjern lytteren etter bruk
          return true
        })

        // Legg til oppgaven før vi viser lightbox
        gantt.addTask(task)

        // Legg til en lytter for lightbox_cancel
        const onCancel = gantt.attachEvent('onLightboxCancel', function (id) {
          gantt.detachEvent(onCancel) // Fjern lytteren etter bruk
          gantt.deleteTask(id) // Slett tasken hvis bruker avbryter
          return true
        })

        gantt.showLightbox(task.id)
      } else {
        // Klikk på eksisterende task - åpne for redigering
        gantt.showLightbox(taskId)
      }
      return true
    }

    // Legg til denne custom typen før gantt.init()
    gantt.form_blocks['watt_size'] = {
      render: function (sns) {
        return (
          "<div class='watt-size-container'>" +
          "<div class='watt-field'><label>Kilowatt timer</label><input type='number' name='kwt'></div>" +
          "<div class='size-field'><label>Størrelse</label><input type='number' name='size'></div>" +
          '</div>'
        )
      },
      set_value: function (node, value, task) {
        node.querySelector("[name='kwt']").value = task.kwt || 200
        node.querySelector("[name='size']").value = task.size || 1
      },
      get_value: function (node, task) {
        task.kwt = node.querySelector("[name='kwt']").value
        task.size = node.querySelector("[name='size']").value
        return task
      },
    }

    // Legg til styling
    const style = document.createElement('style')
    style.innerHTML = `
    .gantt_task_row{
    border: none;
    }
      .watt-size-container {
        display: flex;
        gap: 20px;
      }
      .watt-field, .size-field {
        flex: 1;
      }
      .watt-field input, .size-field input {
        width: 100%;
        padding: 5px;
      }
        .gantt_task_row{
        margin:0;
        
        
        }
    `
    document.head.appendChild(style)

    // Definer handleKeyDown-funksjonen inne i useEffect
    const handleKeyDown = (e) => {
      console.log('Keycode:', e.keyCode)
      if (e.keyCode === 46 || e.keyCode === 8) {
        const selectedId = gantt.getSelectedId()
        if (selectedId) {
          gantt.deleteTask(selectedId)
        }
      }
    }

    // Bruk den definerte handleKeyDown-funksjonen
    ganttContainer.current.addEventListener('keydown', handleKeyDown)

    // Legg til tabIndex for å gjøre containeren fokusbar
    ganttContainer.current.tabIndex = 0

    return () => {
      if (ganttContainer.current) {
        ganttContainer.current.removeEventListener('keydown', handleKeyDown)
      }
      gantt.clearAll()
    }
  }, [])

  const createNewTask = (startDate, endDate) => ({
    text: 'Forbruk',
    kwt: 100,
    size: 1,
    start_date: startDate,
    end_date: endDate,
  })

  const onDragEnd = (
    startPoint,
    endPoint,
    startDate,
    endDate,
    tasksBetween
  ) => {
    console.log(
      'onDragEnd',
      startPoint,
      endPoint,
      startDate,
      endDate,
      tasksBetween
    )
    const newTask = createNewTask(startDate, endDate)
    gantt.addTask(newTask)
  }

  return (
    <GanttWrapper
      ref={ganttContainer}
      style={{ width: '885px', height: '300px' }}
    />
  )
}

export default GanttTidslinje

const GanttWrapper = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  height: 400px;
  width: 885px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 1rem;
`
