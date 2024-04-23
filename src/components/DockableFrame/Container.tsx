import * as React from "react";
import * as Dockable from "./index";
import styled from "styled-components";
import safeWindow from "../safeWindow";




const StyledContainer = styled.div<{
}>`
    --dockable-voidBkg: #252525;
    --dockable-panelBkg: #1e1e1e;
    --dockable-panelInactiveBorder: #393939;
    --dockable-panelActiveBorder: #777777;
    --dockable-panelTabBkg: #2d2d2d;
    --dockable-panelTabTextColor: #ffffff;
    --dockable-overlayColor: #00aaff44;
    --dockable-anchorColor: #00aaff;
    --dockable-buttonHoverBkg: #323232;
    --dockable-scrollbarColor: #777777;

    width: 100%;
    height: 100%;
    background-color: var(--dockable-voidBkg);
`;


const StyledContentRoot = styled.div<{
    isCurrentTab: boolean
}>`
    display: ${ props => props.isCurrentTab ? "grid" : "none" };
    grid-template: 100% / 100%;

    position: absolute;
    box-sizing: border-box;
    contain: strict;

    color: #fff;
    text-align: left;

    background-color: transparent;
    overflow: hidden;
`;


const StyledContentInner = styled.div`
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    height: 100%;
`;


const StyledBottomRightResizeHandle = styled.div<{
    size: number,
}>`
    width: ${ props => props.size }px;
    height: ${ props => props.size }px;

    grid-row: 1;
    grid-column: 1;
    align-self: end;
    justify-self: end;

    cursor: nwse-resize;
    z-index: 1;

    &:hover
    {
        background-color: var(--dockable-overlayColor);
    }
`;


const StyledDivider = styled.div`
    &:hover
    {
        background-color: var(--dockable-overlayColor);
    }
`;


export function Container(props: {
        state: Dockable.RefState<Dockable.State>,   
        anchorSize?: number,
        resizeHandleSize?: number,
        dividerSize?: number,
        tabHeight?: number
    }) {
    const [rect, setRect] = React.useState(new Dockable.Rect(0, 0, 0, 0));
    const rootRef = React.useRef<HTMLDivElement>(null);


    const anchorSize = props.anchorSize ?? 5;
    const resizeHandleSize = props.anchorSize ?? 10;
    const dividerSize = props.anchorSize ?? 6;
    const tabHeight = props.anchorSize ?? 25;


    React.useLayoutEffect(() => {
        const onResize = () => {
            if (!rootRef.current) {
                return;
            }
            const { x, y, width, height } = rootRef.current!.getBoundingClientRect();
            setRect(new Dockable.Rect(x, y, width, height));
        }

        onResize();
            safeWindow.addEventListener("resize", onResize);
            return () => safeWindow.removeEventListener("resize", onResize);
    }, []);


    const rectRef = React.useRef<Dockable.Rect>(null!);
    rectRef.current = rect;


    const layoutRef = React.useRef<Dockable.Layout>(null!);
    layoutRef.current = React.useMemo(() => {
        const { x, y, w, h } = rect;
        const { current } = props.state.ref;
        return Dockable.getLayout(current, new Dockable.Rect(x, y, w - 1, h - 1));
    }, [rect, props.state.updateToken]);


    const setTitle = (layoutContent: Dockable.LayoutContent, title: string) => {
        if (layoutContent.content.title != title) {
            safeWindow.requestAnimationFrame(() => {
                layoutContent.content.title = title;
                props.state.commit();
            });
        }
    }

    const setPreferredSize = (layoutContent: Dockable.LayoutContent, width: number, height: number) => {
        const { tabIndex, panel } = layoutContent;
        const { currentTabIndex, preferredWidth, preferredHeight, rect } = panel;
        const { x, y } = rect;
        if (tabIndex == currentTabIndex &&  (width != preferredWidth || height != preferredHeight )) {
            safeWindow.requestAnimationFrame(() => {
                panel.preferredWidth = width,
                panel.preferredHeight = height,
                panel.rect = new Dockable.Rect(x, y, width, height),
                props.state.commit()
            });
        }
    }

    return (
    <StyledContainer ref={rootRef}>
        {layoutRef.current.panelRects.map(panelRect =>
            <Dockable.ContainerPanel
                key={panelRect.panel.id}
                state={props.state}
                panelRect={ panelRect }
                tabHeight={ tabHeight }
                onClickPanel={ () => handleClickedPanel(props.state, panelRect.panel, null) }
                onClickTab={ (tabNumber) => handleClickedPanel(props.state, panelRect.panel, tabNumber) }
                onCloseTab={ (ev, tabNumber) => handleClosedTab(ev, props.state, panelRect.panel, tabNumber) }
                onDragHeader={ (ev, tabNumber) => handleDraggedHeader(ev, props.state, layoutRef, rectRef, panelRect.panel, tabNumber) }
            />
        )}

        {layoutRef.current.content.map(layoutContent =>
            <StyledContentRoot
                key={layoutContent.content.contentId}
                isCurrentTab={ layoutContent.panel.currentTabIndex == layoutContent.tabIndex }
                onMouseDown={ () => handleClickedPanel(props.state, layoutContent.panel, null) }
                style={{
                    left: `${layoutContent.layoutPanel.rect.x}px`,
                    top: `${layoutContent.layoutPanel.rect.y + tabHeight}px`,
                    width: `${layoutContent.layoutPanel.rect.w}px`,
                    height: `${layoutContent.layoutPanel.rect.h - tabHeight}px`,
                    zIndex: layoutContent.layoutPanel.zIndex * 3 + 1,
            }}>
                <Dockable.ContentContext.Provider value={{ layoutContent, setTitle: (title) => setTitle(layoutContent, title), setPreferredSize: (w, h) => setPreferredSize(layoutContent, w, h) }}>
                    <StyledContentInner>
                        {React.cloneElement(layoutContent.content.element, { ...props.state })}
                    </StyledContentInner>
                </Dockable.ContentContext.Provider>
                
                {layoutContent.panel.floating &&
                    <StyledBottomRightResizeHandle
                        size={resizeHandleSize}
                        onMouseDown={ev => {
                            handleClickedPanel(props.state, layoutContent.panel, null)
                            handleDraggedEdge(ev, props.state, layoutRef, layoutContent.panel)
                        }}
                    />
                }
            </StyledContentRoot>
        )}

        {layoutRef.current.dividers.map((divider, i) =>
            <StyledDivider key={i} onMouseDown={ ev => handleDraggedDivider(ev, props.state, divider) }
                style={{
                    width: `${divider.rect.w || dividerSize}px`,
                    height: `${divider.rect.h || dividerSize}px`,
                    position: "absolute",
                    left: `${divider.rect.x - (!divider.vertical ? dividerSize / 2 : 0)}px`,
                    top: `${divider.rect.y - (divider.vertical ? dividerSize / 2 : 0)}px`,
                    cursor: !divider.vertical ? "ew-resize" : "ns-resize",
                    zIndex: 1,
                    userSelect: "none",
            }}/>
        )}

        {props.state.ref.current.previewAnchor &&
            <div style={{
                position: "absolute",
                left: `${props.state.ref.current.previewAnchor.previewRect.x}px`,
                top: `${props.state.ref.current.previewAnchor.previewRect.y}px`,
                width: `${props.state.ref.current.previewAnchor.previewRect.w - 1}px`,
                height: `${props.state.ref.current.previewAnchor.previewRect.h - 1}px`,
                backgroundColor: "var(--dockable-overlayColor)",
                zIndex: 1000,
            }} />
        }

        {props.state.ref.current.showAnchors && layoutRef.current.anchors.map((anchor, i) => props.state.ref.current.draggedPanel !== anchor.panel &&
            <div key={i}
                style={{
                    position: "absolute",
                    left: `${anchor.x - anchorSize}px`,
                    top: `${anchor.y - anchorSize}px`,
                    width: "0px",
                    height: "0px",
                    borderTop: `${anchorSize}px solid ${anchor.mode == Dockable.DockMode.Bottom || anchor.mode == Dockable.DockMode.Full ? "var(--dockable-anchorColor)" : "transparent"}`, 
                    borderBottom: `${anchorSize}px solid ${anchor.mode == Dockable.DockMode.Top || anchor.mode == Dockable.DockMode.Full ? "var(--dockable-anchorColor)" : "transparent"}`, 
                    borderLeft: `${anchorSize}px solid ${anchor.mode == Dockable.DockMode.Right || anchor.mode == Dockable.DockMode.Full ? "var(--dockable-anchorColor)" : "transparent"}`, 
                    borderRight: `${anchorSize}px solid ${anchor.mode == Dockable.DockMode.Left || anchor.mode == Dockable.DockMode.Full ? "var(--dockable-anchorColor)" : "transparent"}`, 
                    zIndex: 1001,
            }} />
        )}
    </StyledContainer>
    );
}


function handleDraggedDivider(
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    state: Dockable.RefState<Dockable.State>,
    divider: Dockable.Divider) 
    {
    ev.preventDefault();
    const onMouseMove = e => {
        const { pageX: mouseX, pageY: mouseY } = e;
        const { vertical, resizeMin, resizeMax } = divider;
        divider.panel.splitSize = Math.max(0.05, Math.min(0.95, ((vertical ? mouseY : mouseX) - resizeMin) / (resizeMax - resizeMin)));
        state.commit();
    }

    const onMouseUp = () => {
        safeWindow.removeEventListener("mousemove", onMouseMove);
        safeWindow.removeEventListener("mouseup", onMouseUp);        
    }
    safeWindow.addEventListener("mousemove", onMouseMove);
    safeWindow.addEventListener("mouseup", onMouseUp);
}


function handleDraggedEdge(
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    state: Dockable.RefState<Dockable.State>,
    layout: React.MutableRefObject<Dockable.Layout>,
    panel: Dockable.Panel) {

    ev.preventDefault();
    ev.stopPropagation();
    const { pageX: startMouseX, pageY: startMouseY } = ev;
    const { panelRects } = layout.current;
    const startPanelRect = (panelRects.find(p => p.panel === panel)!).rect;

    const onMouseMove = (ev) => {
        const { pageX: mouseX, pageY: mouseY } = ev;
        const { x, y, w, h } = startPanelRect;
        panel.rect = new Dockable.Rect(x, y, Math.max(150, w + mouseX - startMouseX), Math.max(50, h + mouseY - startMouseY));
        state.commit();
    }

    const onMouseUp = () => {
        safeWindow.removeEventListener("mousemove", onMouseMove);
        safeWindow.removeEventListener("mouseup", onMouseUp);
    }

    safeWindow.addEventListener("mousemove", onMouseMove);
    safeWindow.addEventListener("mouseup", onMouseUp);
}


function handleDraggedHeader(
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    state: Dockable.RefState<Dockable.State>,
    layout: React.MutableRefObject<Dockable.Layout>,
    containerRect: React.MutableRefObject<Dockable.Rect>,
    draggedPanel: Dockable.Panel,
    draggedTabIndex: number | null) {

    ev.preventDefault();
    ev.stopPropagation();

    const { pageX: startMouseX, pageY: startMouseY} = ev;
    const { panelRects } = layout.current;

    let { rect: startPanelRect } = panelRects.find(p => p.panel === draggedPanel)!
    let dragLocked = true;
    const { preferredWidth, preferredHeight, contentList, currentTabIndex } = draggedPanel;

    const onMouseMove = ev => {
        const { pageX: mouseX, pageY: mouseY } = ev;

        // Start dragging only when mouse moves far enough, and
        // undock panel at this moment if originally docked
        if (Math.abs(mouseX - startMouseX) > 10 || Math.abs(mouseY - startMouseY) > 10) {
            dragLocked = false;

            const floatingRect = new Dockable.Rect(
                mouseX - Math.min(preferredWidth / 2, mouseX - startPanelRect.x), 
                mouseY - (mouseY - startPanelRect.y), preferredWidth, preferredHeight
            );
                
            if (draggedTabIndex !== null && contentList.length > 1) {
                // Remove single tab content from original panel and
                // transfer it to a new floating panel
                const content = contentList[draggedTabIndex];
                Dockable.removeContent(state.ref.current, draggedPanel, content.contentId);
                draggedPanel = Dockable.makePanel(state.ref.current);
                Dockable.addContent(state.ref.current, draggedPanel, content);
                Dockable.coallesceEmptyPanels(state.ref.current);
                draggedPanel.rect = startPanelRect = floatingRect;
            } else if (!draggedPanel.floating) {
                // Remove original docked panel and
                // transfer all content to a new floating panel
                const contents = [...contentList];
                const originalTabIndex = currentTabIndex;
                for (const content of contents)
                    Dockable.removeContent(state.ref.current, draggedPanel, content.contentId);
                
                draggedPanel = Dockable.makePanel(state.ref.current);
                for (const content of contents)
                    Dockable.addContent(state.ref.current, draggedPanel, content);

                draggedPanel.currentTabIndex = originalTabIndex;
                Dockable.coallesceEmptyPanels(state.ref.current);
                draggedPanel.rect = startPanelRect = floatingRect;
            }

            state.ref.current.draggedPanel = draggedPanel;
            state.ref.current.showAnchors = true;
            state.commit();
        }

        // Handle actual dragging
        if (!dragLocked) {
            // Move panel rect
            draggedPanel.rect = startPanelRect.displace(mouseX - startMouseX, mouseY - startMouseY);
            
            // Find nearest anchor
            let nearestDistSqr = 50 * 50;
            state.ref.current.previewAnchor = null;

            for (const anchor of layout.current.anchors) {
                if (anchor.panel === draggedPanel)
                    continue;

                const xx = anchor.x - mouseX;
                const yy = anchor.y - mouseY;
                const distSqr = xx * xx + yy * yy;
                if (distSqr < nearestDistSqr) {
                    nearestDistSqr = distSqr;
                    state.ref.current.previewAnchor = anchor;
                }
            }
            state.commit()
        }
    }

    const onMouseUp = () => {
        safeWindow.removeEventListener("mousemove", onMouseMove);
        safeWindow.removeEventListener("mouseup", onMouseUp);

        
        // Dock dragged panel if near an anchor
        if (state.ref.current.previewAnchor) {
            const { current } = state.ref;
            const { panel, mode } = state.ref.current.previewAnchor;
            Dockable.dock(current, draggedPanel, panel, mode);
        }

        Dockable.clampFloatingPanels(state.ref.current, containerRect.current);
        state.ref.current.draggedPanel = null;
        state.ref.current.showAnchors = false;
        state.ref.current.previewAnchor = null;
        state.commit();
    }

    safeWindow.addEventListener("mousemove", onMouseMove);
    safeWindow.addEventListener("mouseup", onMouseUp);
}


function handleClickedPanel(state: Dockable.RefState<Dockable.State>, clickedPanel: Dockable.Panel, tabNumber: number | null) {
    if (tabNumber !== null) {
        clickedPanel.currentTabIndex = tabNumber;
    }
    Dockable.setPanelActiveAndBringToFront(state.ref.current, clickedPanel);
    state.commit();
}


function handleClosedTab(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, state: Dockable.RefState<Dockable.State>, panel: Dockable.Panel, tabNumber: number) {
    ev.preventDefault();
    Dockable.removeContent(state.ref.current, panel, panel.contentList[tabNumber].contentId);
    Dockable.coallesceEmptyPanels(state.ref.current);
    state.commit();
}