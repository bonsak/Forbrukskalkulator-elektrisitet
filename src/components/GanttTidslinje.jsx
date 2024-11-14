import { useEffect, useRef, useState } from 'react'
import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import styled from 'styled-components'

const GanttTidslinje = () => {
  const ganttContainer = useRef(null)

  useEffect(() => {
    gantt.plugins({
      click_drag: true,
    })

    gantt.config.click_drag = {
      callback: onDragEnd,
      // singleRow: true,
    }

    gantt.config.show_grid = false
    gantt.config.show_task_cells = false
    // gantt.config.show_task_row = false

    gantt.config.drag_resize = true
    gantt.config.drag_move = true
    gantt.config.order_branch = true
    gantt.config.order_branch_free = true
    // gantt.config.order_branch_free = true
    gantt.config.drag_progress = false

    gantt.config.drag_timeline = {
      move: true,
      resize: true,
      progress: false,
    }
    // gantt.config.drag_mode = {
    //   move: true,
    //   resize: true,
    //   progress: false,
    // }

    // gantt.attachEvent('onBeforeTaskDrag', function (id, mode, e) {
    //   console.log('Drag started:', id, mode)
    //   return true
    // })

    // gantt.attachEvent('onAfterTaskMove', function (id, parent, tindex) {
    //   console.log('Task moved:', id, 'New index:', tindex)
    // })
    // gantt.config.drag_mode = {
    //   move: true,
    //   // resize: true,
    //   // progress: true,
    //   ignore: false,
    // }

    // gantt.attachEvent('onEmptyClick', (e) => {
    //   const pos = gantt.getScrollState()
    //   const posx = e.clientX - ganttContainer.current.offsetLeft + pos.x
    //   const rawDate = gantt.dateFromPos(posx)
    //   const roundedDate = new Date(rawDate)
    //   roundedDate.setMinutes(30)
    //   if (roundedDate < rawDate) {
    //     roundedDate.setHours(roundedDate.getHours() + 1)
    //   }
    //   roundedDate.setMinutes(0)

    //   const newTask = {
    //     id: gantt.uid(),
    //     text: 'Ny Oppgave',
    //     start_date: roundedDate,
    //     duration: 1,
    //     watt: 200,
    //     size: 1,
    //   }
    //   gantt.addTask(newTask)
    //   return true
    // })

    // Konfigurer tidsskala
    gantt.config.duration_unit = 'hour'
    gantt.config.duration_step = 1

    gantt.config.min_column_width = 25

    // Sett start og slutt tid for visningen
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(24, 0, 0, 0)

    gantt.config.start_date = today
    gantt.config.end_date = endDate

    // Konfigurer skala detaljer
    gantt.config.scale_height = 50
    gantt.config.scales = [{ unit: 'hour', step: 1, format: '%H' }]

    // Aktiver dra-oppretting i timeline
    gantt.config.show_chart = true
    gantt.config.read_only = false
    gantt.config.drag_links = false

    // Tillat dobbeltklikk for å lage nye tasks
    gantt.config.dblclick_create = true

    // Default 24 timer for nye oppgaver
    gantt.templates.task_time = function (start, end, task) {
      if (!task.duration) {
        task.duration = 1
      }
      return ''
    }

    // Oppdatert lightbox
    gantt.config.lightbox.sections = [
      {
        name: 'description',
        height: 38,
        map_to: 'text',
        type: 'textarea',
        focus: true,
        label: 'Task name',
      },
      {
        name: 'kwt',
        height: 22,
        map_to: 'kwt',
        type: 'number',
        min: 0,
        label: 'Watt',
      },
      {
        name: 'size',
        height: 22,
        map_to: 'size',
        type: 'number',
        min: 0,
        label: 'Size',
      },
    ]

    // Hindre at tasks kan gå utenfor 24-timers perioden
    gantt.attachEvent('onTaskDrag', function (task) {
      const taskStart = task.start_date
      const taskEnd = task.end_date

      if (taskStart < today || taskEnd > endDate) {
        return false
      }
      return true
    })

    // Initialiser med sample data
    const data = {
      data: [
        {
          id: 1,
          text: 'Forbruk',
          start_date: new Date(new Date().setHours(8, 0, 0)),
          duration: 2,
          kwt: 100,
          size: 50,
        },
      ],
    }

    gantt.init(ganttContainer.current)
    gantt.parse(data)

    // Konfigurer lightbox feltene
    gantt.config.lightbox.sections = [
      {
        name: 'description',
        height: 38,
        map_to: 'text',
        type: 'textarea',
        focus: true,
      },
      {
        name: 'watt',
        height: 22,
        map_to: 'watt',
        type: 'textarea',
        default_value: 200,
      },
      {
        name: 'size',
        height: 22,
        map_to: 'size',
        type: 'textarea',
        default_value: 1,
      },
    ]

    // Sett labels for feltene
    gantt.locale.labels.section_description = 'Beskrivelse'
    // gantt.locale.labels.section_time = 'Tid'
    gantt.locale.labels.section_watt = 'Watt'
    gantt.locale.labels.section_size = 'Størrelse'

    ganttContainer.current.ondblclick = function (e) {
      const pos = gantt.getScrollState()
      const posx = e.clientX - ganttContainer.current.offsetLeft + pos.x
      const taskId = gantt.locate(e)

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

        const task = {
          id: gantt.uid(),
          text: 'Forbruk',
          start_date: roundedDate,
          duration: 1,
          watt: 200,
          size: 1,
        }
        gantt.addTask(task)
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

    // Oppdater lightbox konfigurasjon
    gantt.config.lightbox.sections = [
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
    ]

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
    `
    document.head.appendChild(style)

    return () => {
      gantt.clearAll()
      // document.head.removeChild(style)
    }
  }, [])

  const onDragEnd = (
    startPoint,
    endPoint,
    startDate,
    endDate,
    tasksBetween
  ) => {
    const newTask = {
      text: 'Forbruk',
      kwt: 100,
      size: 1,
      start_date: startDate,
      end_date: endDate,
      // progress: 0,
    }
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
  margin-top: 2rem;
`
