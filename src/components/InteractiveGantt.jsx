import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const InteractiveGantt = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Planlegging', start: 0, duration: 3 },
    { id: 2, name: 'Design', start: 3, duration: 4 },
    { id: 3, name: 'Utvikling', start: 7, duration: 5 }
  ]);
  
  const [dragStart, setDragStart] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const daysInChart = 20;
  const dayWidth = 40;
  
  const handleMouseDown = (e, taskId, isResize = false) => {
    setDragStart(e.clientX);
    setActiveTask({ id: taskId, isResize });
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    
    const diff = Math.round((e.clientX - dragStart) / dayWidth);
    if (diff === 0) return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === activeTask.id) {
          if (activeTask.isResize) {
            return {
              ...task,
              duration: Math.max(1, task.duration + diff)
            };
          }
          return {
            ...task,
            start: Math.max(0, task.start + diff)
          };
        }
        return task;
      })
    );
    setDragStart(e.clientX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
    setActiveTask(null);
  };
  
  const addNewTask = () => {
    const newId = Math.max(...tasks.map(t => t.id)) + 1;
    setTasks([...tasks, {
      id: newId,
      name: 'Ny oppgave',
      start: 0,
      duration: 3
    }]);
  };

  return (
    <Card className="w-full max-w-4xl" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Prosjekt Tidslinje</CardTitle>
        <button
          onClick={addNewTask}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-6 h-6" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Tidslinjen */}
          <div className="flex border-b mb-4">
            {Array.from({ length: daysInChart }).map((_, i) => (
              <div
                key={i}
                className="text-center"
                style={{ width: `${dayWidth}px` }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Oppgaver */}
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center">
                <div className="w-32 pr-4">{task.name}</div>
                <div className="relative flex-1">
                  <div
                    className="absolute h-8 bg-blue-500 rounded cursor-move"
                    style={{
                      left: `${task.start * dayWidth}px`,
                      width: `${task.duration * dayWidth}px`
                    }}
                    onMouseDown={(e) => handleMouseDown(e, task.id)}
                  >
                    {/* Resize handle */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown(e, task.id, true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveGantt;
