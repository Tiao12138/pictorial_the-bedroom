document.addEventListener('DOMContentLoaded', function () {
    const scrollableColumn = document.getElementById('scrollable-column');
    
    if (scrollableColumn) {
        console.log('scrollablecolumn valid');
        let isDown = false;
        let startX;
        let scrollLeft;
    
        scrollableColumn.addEventListener('mousedown', (e) => {
            isDown = true;
            console.log('Mouse down at X:', e.pageX);
            scrollableColumn.classList.add('active');
            startX = e.pageX - scrollableColumn.offsetLeft;
            scrollLeft = scrollableColumn.scrollLeft;
            // console.log('Mouse down event, dragging started');
        });

        scrollableColumn.addEventListener('mouseleave', () => {
            isDown = false;
            scrollableColumn.classList.remove('active');
            console.log('Mouse left the scrollable area, dragging ended'); 
        });

        scrollableColumn.addEventListener('mouseup', () => {
            isDown = false;
            scrollableColumn.classList.remove('active');
            console.log('Mouse up event, dragging ended');
        });

        scrollableColumn.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            console.log('Mouse is moving while dragging');
            e.preventDefault();
            const x = e.pageX - scrollableColumn.offsetLeft;
            const walk = (x - startX) * 3; 
            scrollableColumn.scrollLeft = scrollLeft - walk;
        });
    }
});
