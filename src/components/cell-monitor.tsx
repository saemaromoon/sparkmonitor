import { observer } from 'mobx-react-lite';
import React from 'react';

import { useCellStore, useNotebookStore } from '../store';
import { CellMonitorHeader } from './header';
import { JobTable } from './job-table';
import { Timeline } from './timeline';
import { TaskChart } from './task-chart';

export const CellMonitor = observer(() => {
    const notebook = useNotebookStore();
    const cell = useCellStore();

    // If the cell has no spark job
    if (!cell || cell?.jobIds?.length <= 0 || cell.isRemoved || notebook?.hideAllDisplays) {
        return <div className="sparkMonitorCellRoot" />;
    }

    let tabContent = <></>;
    if (!cell.isCollapsed && cell?.view === 'jobs') {
        tabContent = <JobTable />;
    } else if (!cell.isCollapsed && cell?.view === 'taskchart') {
        tabContent = <TaskChart />;
    } else if (!cell.isCollapsed && cell?.view === 'timeline') {
        tabContent = <Timeline />;
    }

    return (
        <div className="sparkMonitorCellRoot CellMonitor pm">
            <CellMonitorHeader />
            <div className="content">{tabContent}</div>
        </div>
    );
});