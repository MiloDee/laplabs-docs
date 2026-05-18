// Documentation article content: keyed by page ID (matches sidebar data-k)
(function(){
window.DOCS_ARTICLES = {

// ─────────────────────────────────────────────────────────────────
// 01: GETTING STARTED
// ─────────────────────────────────────────────────────────────────

'gs.install': {
  section: 'Getting Started',
  title: 'Installation & Setup',
  lede: 'Download the installer for your edition, run it, and launch your first session.',
  prev: null,
  next: ['gs.ui-tour', 'UI Tour'],
  toc: ['requirements', 'editions', 'install', 'launch', 'updates'],
  tocLabels: ['System Requirements', 'Choose Your Edition', 'Install', 'First Launch', 'Updates'],
  body: `
<h2 id="requirements">System Requirements</h2>
<ul>
  <li><strong>OS:</strong> Windows 10 or 11 (64-bit). LapLabs Studio is Windows-only.</li>
  <li><strong>RAM:</strong> 8 GB minimum, 16 GB recommended (especially for the Studio edition's ML training workloads).</li>
  <li><strong>GPU:</strong> Optional. A CUDA 11.8-compatible NVIDIA GPU accelerates ML training in the Studio edition; everything else runs on CPU.</li>
  <li><strong>Disk:</strong> ~2 GB for the application bundle (Studio edition slightly larger due to bundled PyTorch).</li>
  <li><strong>iRacing:</strong> not required to install or run LapLabs Studio, but you'll need it (or its IBT telemetry files) to do anything meaningful.</li>
</ul>

<h2 id="editions">Choose Your Edition</h2>
<p>LapLabs Studio ships as three feature-tiered editions, plus a separate live-telemetry sender. Pick the edition that matches what you want to do:</p>
<ul>
  <li><strong>Lite</strong>: free. Load IBT telemetry, browse stints, view 2D/3D plots. The essentials for post-session review.</li>
  <li><strong>Pro</strong>: adds live iRacing telemetry, waterfall &amp; spectrogram plots, Aux Math expressions, signal filters, dashboards, and the Vehicle/Track/Scope libraries.</li>
  <li><strong>Studio</strong>: adds the ML training pipeline (MLP / GRU / TCN / Transformer), live inference, the Feature Wizard, and model comparison.</li>
  <li><strong>LapLabs Relay</strong>: a separate lightweight standalone app that streams live iRacing telemetry to remote co-viewers. Install alongside any Studio edition if you want to broadcast.</li>
</ul>
<p>You can upgrade tiers later (the installers don't conflict), and your data (extract templates, dashboards, track library, etc.) carries over because all editions read the same per-user config directory.</p>
<p>See <a href="https://laplabs.net/pricing.html">laplabs.net/pricing</a> for the full feature matrix and current pricing.</p>

<h2 id="install">Install</h2>
<p>Each edition is distributed as a standalone Windows installer (<code>.exe</code>). There is no public source repository to clone, the apps are self-contained.</p>
<ol>
  <li>Download the installer for your edition from <a href="https://laplabs.net/products.html">laplabs.net/products</a> (or follow the link in your purchase confirmation email).</li>
  <li>Double-click the <code>.exe</code> to launch the installer. Windows SmartScreen may prompt on first run; click <em>More info → Run anyway</em> to proceed.</li>
  <li>Choose an install location (default is under <code>C:\\Program Files\\</code>) and click <strong>Install</strong>.</li>
  <li>The installer creates Start menu and desktop shortcuts. No further setup required: everything the app needs (Python runtime, dependencies, CUDA libraries for Studio) is bundled inside the install directory.</li>
</ol>

<div class="callout note">
  <span class="ic">i</span>
  <div>
    <span class="lbl">Note</span>
    <p>The Studio edition installer is the largest (~3 GB) because it bundles the full PyTorch + CUDA 11.8 runtime needed for GPU-accelerated training. Lite and Pro skip those and install in well under a gigabyte.</p>
  </div>
</div>

<h2 id="launch">First Launch</h2>
<p>Open LapLabs Studio from the Start menu (or the desktop shortcut). On first launch the app creates a per-user configuration directory under your Windows profile and opens with an empty workspace.</p>
<p>Layout overview:</p>
<ul>
  <li><strong>Top:</strong> menu bar and main toolbar.</li>
  <li><strong>Left column:</strong> Stint folder browser (telemetry files), workflow panel.</li>
  <li><strong>Center:</strong> plot tabs (2D, 3D, waterfall, spectrogram) above the node graph editor.</li>
  <li><strong>Right column:</strong> dashboard viewer and scatter panel.</li>
</ul>
<p>To start analyzing data you'll need iRacing IBT files. See <a href="docs-article.html?page=gs.first-workflow">Your First Workflow</a> for a step-by-step guide.</p>

<h2 id="updates">Updates</h2>
<p>LapLabs Studio checks for a newer version of your edition shortly after each launch. If an update is available, a small notification appears at the top of the main window with a <em>Download Update</em> button; clicking it opens the latest installer in your browser. Re-run that installer over the existing install to upgrade; your settings, libraries, and dashboards are preserved.</p>
<p>The update check is silent on failure (no network, no nag dialogs). You can always grab the latest manually from <a href="https://laplabs.net/products.html">laplabs.net/products</a>.</p>
`
},

'gs.ui-tour': {
  section: 'Getting Started',
  title: 'UI Tour',
  lede: 'A walkthrough of the main panels, menus, and controls in LapLabs Studio.',
  prev: ['gs.install', 'Installation & Setup'],
  next: ['gs.first-workflow', 'Your First Workflow'],
  toc: ['layout', 'sidebar', 'graph', 'plots', 'dash', 'menus', 'shortcuts'],
  tocLabels: ['Main Layout', 'Node Sidebar', 'Graph Editor', 'Plot Panels', 'Dashboard', 'Menus', 'Keyboard Shortcuts'],
  body: `
<h2 id="layout">Main Layout</h2>
<p>LapLabs Studio uses a three-column layout with collapsible panels:</p>
<ul>
  <li><strong>Left column:</strong> Stint browser (loaded data segments) and console output</li>
  <li><strong>Center:</strong> Plot tabs (2D, 3D, waterfall, spectrogram) above the node graph editor</li>
  <li><strong>Right column:</strong> Dashboard viewer and scatter plot panel</li>
</ul>
<p>All panels are connected via resizable splitters with pull-tab handles for collapsing.</p>

<h2 id="sidebar">Node Sidebar</h2>
<p>The node library sidebar (bottom-center, within the graph area) lists all available node types organized by category: Data, Transform, Output, and Live. Drag a node from the sidebar onto the graph canvas to add it.</p>

<h2 id="graph">Graph Editor</h2>
<p>The visual node graph is where you build analysis workflows. Nodes have typed input/output ports; connect them by dragging from an output port to a compatible input port. The graph executes topologically: upstream nodes run first, passing data downstream.</p>

<h2 id="plots">Plot Panels</h2>
<p>Plot outputs appear as tabbed panels above the graph. Supported plot types:</p>
<ul>
  <li><strong>2D Plots:</strong> Multi-line time-series with cursor sync, legend, and unit conversion</li>
  <li><strong>3D Plots:</strong> Track visualization with car position, ghost laps, and color mapping</li>
  <li><strong>Waterfall:</strong> Multi-lap stacked view for lap-to-lap comparison</li>
  <li><strong>Spectrogram:</strong> Frequency-domain analysis</li>
</ul>

<h2 id="dash">Dashboard</h2>
<p>The dashboard panel on the right displays real-time instrument gauges, bar meters, numeric readouts, and more. It syncs with the 2D plot cursor in offline mode and with live iRacing data during streaming.</p>

<h2 id="menus">Menus</h2>
<ul>
  <li><strong>File:</strong> New, Save, Load layouts (Ctrl+N, Ctrl+S, Ctrl+O)</li>
  <li><strong>Run:</strong> Execute graph (F5), Run Live (F6), Pause (F8), Stop (F12)</li>
  <li><strong>View:</strong> Toggle Sidebar, Dashboard, Scatter Panel</li>
  <li><strong>Tools:</strong> Vehicle Library, Track Library, Scope Builder, Feature Wizard, Dash Library, Live Dash, Preferences</li>
</ul>

<h2 id="shortcuts">Keyboard Shortcuts</h2>
<ul>
  <li><strong>Ctrl+N</strong>: New layout</li>
  <li><strong>Ctrl+O</strong>: Load layout</li>
  <li><strong>Ctrl+S</strong>: Save layout</li>
  <li><strong>Ctrl+Shift+S</strong>: Save layout as</li>
  <li><strong>F5</strong>: Run graph</li>
  <li><strong>F6</strong>: Run live</li>
  <li><strong>F8</strong>: Pause</li>
  <li><strong>F12</strong>: Stop</li>
  <li><strong>Ctrl+W</strong>: Toggle sidebar</li>
  <li><strong>Ctrl+Shift+D</strong>: Toggle dashboard</li>
  <li><strong>Ctrl+Shift+X</strong>: Toggle scatter panel</li>
  <li><strong>Ctrl+Q</strong>: Quit</li>
</ul>
`
},

'gs.first-workflow': {
  section: 'Getting Started',
  title: 'Your First Workflow',
  lede: 'Load an IBT file, build a simple graph, and generate your first telemetry plot.',
  prev: ['gs.ui-tour', 'UI Tour'],
  next: ['gs.stint-browser', 'Stint Folder Browser'],
  toc: ['overview', 'load', 'output', 'run', 'explore'],
  tocLabels: ['Overview', 'Add Load Data', 'Add Output', 'Run the Graph', 'Explore the Plot'],
  body: `
<h2 id="overview">Overview</h2>
<p>The simplest useful workflow in LapLabs is two nodes: <strong>Load Data</strong> to read telemetry files, and <strong>Output</strong> to visualize them. This guide walks through that setup.</p>

<h2 id="load">Step 1: Add a Load Data Node</h2>
<ol>
  <li>Drag a <strong>Load Data</strong> node from the Data category in the sidebar onto the graph canvas.</li>
  <li>Double-click the node to open its properties.</li>
  <li>Set the <strong>IBT Folder</strong> to the directory containing your iRacing IBT files (usually <code>Documents\\iRacing\\telemetry</code>).</li>
  <li>Select a stint from the dropdown.</li>
</ol>

<h2 id="output">Step 2: Add an Output Node</h2>
<ol>
  <li>Drag an <strong>Output</strong> node from the Output category onto the canvas.</li>
  <li>Connect the <strong>TrainData</strong> output port of Load Data to the <strong>Data</strong> input port of Output.</li>
</ol>

<h2 id="run">Step 3: Run the Graph</h2>
<p>Press <strong>F5</strong> or click Run in the toolbar. The graph will execute: Load Data reads and parses the IBT file, then Output generates the plots.</p>

<h2 id="explore">Step 4: Explore the Plot</h2>
<p>After execution, plot tabs appear above the graph:</p>
<ul>
  <li><strong>2D Plot:</strong> Time-series of all telemetry channels. Click the legend to show/hide channels. Scroll to zoom, drag to pan.</li>
  <li><strong>3D Plot:</strong> Track visualization with the car position. Use mouse to rotate, scroll to zoom.</li>
</ul>
<p>The dashboard panel on the right will also populate with gauges bound to the loaded data. Move the cursor on the 2D plot to scrub through the session.</p>
`
},

'gs.stint-browser': {
  section: 'Getting Started',
  title: 'Stint Folder Browser',
  lede: 'Navigate your telemetry library with the folder tree and quick-nav shortcuts.',
  prev: ['gs.first-workflow', 'Your First Workflow'],
  next: ['gs.summary-tree', 'Summary Hierarchy'],
  toc: ['overview', 'folder-tree', 'quick-nav', 'selection'],
  tocLabels: ['Overview', 'Folder Tree', 'Quick Navigation', 'Folder Selection'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Stint Folder Browser</strong> is the left-column panel that lets you navigate to folders of telemetry files on disk. It's the starting point for the non-model workflow: select a folder, and the summary tree and workflow panel do the rest.</p>
<p>The panel layout from top to bottom:</p>
<ul>
  <li>Folder path display (truncated current path)</li>
  <li>Quick-nav shortcut buttons</li>
  <li>Folder tree (file system browser)</li>
  <li>Summary tree (populated after folder selection)</li>
</ul>

<h2 id="folder-tree">Folder Tree</h2>
<p>The folder tree uses a <code>QFileSystemModel</code> to display your file system as a navigable directory tree. The currently selected folder is highlighted in cyan with bold text.</p>
<ul>
  <li><strong>Click</strong> any folder to select it as the active stint library</li>
  <li>The tree only shows directories (files are hidden)</li>
  <li>Selection triggers automatic summarization: the app scans the folder for IBT/Parquet/CSV files in the background</li>
  <li>Your selection is saved to app config and restored on next launch</li>
</ul>

<h2 id="quick-nav">Quick Navigation</h2>
<p>Two shortcut buttons above the folder tree jump to common locations:</p>
<ul>
  <li><strong>iRacing Telemetry</strong>: navigates to <code>~/Documents/iRacing/telemetry</code> (or OneDrive equivalent)</li>
  <li><strong>LapLabs StintData</strong>: navigates to your configured stint data folder</li>
</ul>
<p>These save you from manually drilling through the file system tree to reach frequently-used directories.</p>

<h2 id="selection">Folder Selection</h2>
<p>When you select a folder:</p>
<ol>
  <li>The folder path updates in the header label</li>
  <li>A background worker (<code>FolderSummaryWorker</code>) scans all telemetry files in the folder</li>
  <li>Results are cached to a <code>.cache.json</code> file for instant re-loading next time</li>
  <li>The Summary Hierarchy tree populates with the scanned data</li>
  <li>The Workflow Panel becomes ready to run on the selected data</li>
</ol>
<p>The scan runs in a background thread so the UI stays responsive even for folders with hundreds of IBT files.</p>
`
},

'gs.summary-tree': {
  section: 'Getting Started',
  title: 'Summary Hierarchy',
  lede: 'The multi-level tree that organizes your telemetry by car, track, file, stint, outing, and lap.',
  prev: ['gs.stint-browser', 'Stint Folder Browser'],
  next: ['gs.workflow-panel', 'Workflow Panel'],
  toc: ['overview', 'hierarchy', 'columns', 'selection', 'play-icon', 'caching'],
  tocLabels: ['Overview', 'Hierarchy Levels', 'Columns', 'Selection & Checkboxes', 'Play Icon', 'Caching'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Summary Hierarchy</strong> is a tree widget below the folder browser that organizes all telemetry files in the selected folder into a structured view: Car → Track → File → Stint → Outing → Lap. It shows aggregate statistics and lets you select exactly which data to analyze.</p>

<h2 id="hierarchy">Hierarchy Levels</h2>
<p>The tree has up to 5 nesting levels, built automatically from file metadata:</p>
<ul>
  <li><strong>Car</strong> (top level): groups all sessions by vehicle. Bold text, no checkbox. Background: dark blue-tint.</li>
  <li><strong>Track</strong>: groups files by circuit within each car. <strong>Radio-checked</strong>: only one track can be active per car at a time. Selecting a different track deselects the previous one.</li>
  <li><strong>File</strong>: individual telemetry files. Checkable. Shows a format indicator: ◆ for Parquet, ○ for CSV, blank for IBT.</li>
  <li><strong>Stint</strong>: continuous on-track runs within each file. Checkable. Shows stint duration.</li>
  <li><strong>Outing / Lap</strong>: individual laps within stints. Checkable. Shows lap time with best-lap highlighting.</li>
</ul>
<p>A <strong>Totals row</strong> at the bottom (pinned, always last) shows aggregate counts and the overall best lap time across all files.</p>

<h2 id="columns">Columns</h2>
<p>The tree has 6 columns with proportional resizing:</p>
<ul>
  <li><strong>Name</strong> (40%): car/track/file/stint/lap label</li>
  <li><strong>Stints</strong> (12%): number of stints in this item</li>
  <li><strong>Outings</strong> (12%): number of outings</li>
  <li><strong>Laps</strong> (12%): total lap count</li>
  <li><strong>Best</strong> (12%): best lap time (highlighted for the overall best)</li>
  <li><strong>Time</strong> (12%): total session time</li>
</ul>
<p>Click any column header to sort. The sort direction indicator (▲/▼) shows the current order.</p>

<h2 id="selection">Selection & Checkboxes</h2>
<p>Checkboxes control which data the workflow panel processes:</p>
<ul>
  <li><strong>Track level:</strong> Radio behavior, checking one track unchecks others in the same car group</li>
  <li><strong>File level:</strong> Checking/unchecking cascades to all child stints and laps</li>
  <li><strong>Stint/Lap level:</strong> Checking cascades down; parent updates to partial (tri-state) if only some children are checked</li>
</ul>
<p>Only checked items are included when you run the workflow. This lets you quickly isolate specific stints or laps for analysis.</p>

<h2 id="play-icon">Play Icon</h2>
<p>Each tree item has a small play icon (▶) that appears on hover. Clicking it immediately runs the workflow on <em>just that item</em>: whether it's a single file, a stint, or even a single lap.</p>
<ul>
  <li>Clicking play on a <strong>file</strong> runs the entire file</li>
  <li>Clicking play on a <strong>stint</strong> loads only that stint's time range</li>
  <li>Clicking play on a <strong>lap</strong> loads only that lap's session time window</li>
</ul>
<p>This is the fastest way to visualize a specific portion of data. One click and the plots appear.</p>

<h2 id="caching">Caching</h2>
<p>Folder scan results are cached to <code>~/.laplabsstudio/stint_summary_HASH.cache.json</code>. The cache stores:</p>
<ul>
  <li>Per-file metadata: stint count, outing count, lap count, best lap time, total session time</li>
  <li>Detailed stint/outing/lap structure with SessionTime ranges</li>
  <li>Your checkbox selection state (which tracks/files/stints are checked)</li>
</ul>
<p>On re-opening the same folder, the tree loads instantly from cache. The cache invalidates when files are added, removed, or modified.</p>
`
},

'gs.workflow-panel': {
  section: 'Getting Started',
  title: 'Workflow Panel',
  lede: 'The primary analysis interface for running telemetry through extraction, expressions, and filtering without building a node graph.',
  prev: ['gs.summary-tree', 'Summary Hierarchy'],
  next: ['nodes.load-data', 'Load Data'],
  toc: ['overview', 'sections', 'data-source', 'view-data', 'processing', 'output', 'running'],
  tocLabels: ['Overview', 'Panel Sections', 'Data Source', 'View Data', 'Processing', 'Output & Run', 'Running'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Workflow Panel</strong> is the primary way to use LapLabs when you're not building ML models. It provides a streamlined, graph-free interface for loading telemetry, applying transforms, and generating plots: all controlled from a compact vertical panel.</p>
<p>Behind the scenes, the panel drives 5 hidden node instances in sequence: <strong>Load Data → Extract Set → [Aux Math] → [Filter] → Output</strong>. You get all the power of the node graph without building one.</p>

<h2 id="sections">Panel Sections</h2>
<p>The workflow panel is organized into four collapsible sections from top to bottom:</p>
<ol>
  <li><strong>Data Source</strong>: segmentation and track settings</li>
  <li><strong>View Data</strong>: extraction template selection</li>
  <li><strong>Processing</strong>: optional Aux Math and Filter steps</li>
  <li><strong>Output</strong>: plot type toggles and run buttons</li>
</ol>

<h2 id="data-source">Data Source</h2>
<ul>
  <li><strong>Segmentation</strong>: dropdown: Stint, Tire Change, Pit, Best Lap. Controls how the loaded files are split into segments (same options as the Load Data node).</li>
  <li><strong>Track</strong>: dropdown populated from your track library. Determines which track geometry is used for the 3D plot. Set to Auto for automatic detection from file metadata.</li>
  <li><strong>Denoise</strong>: checkbox (enabled by default). Applies session clock jitter correction, highly recommended for clean time-series.</li>
</ul>

<h2 id="view-data">View Data</h2>
<ul>
  <li><strong>Template</strong>: dropdown of extraction templates (Standard, Detailed, Tire Temps, etc.). Controls which variables are extracted from the raw data.</li>
  <li><strong>Gear button</strong>: opens the Extract Set configuration dialog for editing the template or adding custom channels.</li>
</ul>
<p>The template determines what's available in the plots. "Standard" covers common dashboard variables; "Detailed" includes tire data, suspension, and engine parameters.</p>

<h2 id="processing">Processing (Optional)</h2>
<h3>Aux Math</h3>
<ul>
  <li>Checkbox to enable: when unchecked, this step is skipped entirely</li>
  <li>Expression field for custom computed channels (same syntax as the Aux Math node)</li>
  <li>Gear button opens the full expression editor dialog</li>
</ul>
<p>Use this for quick derived channels like total G-force, speed conversions, or slip calculations without needing to add a node to a graph.</p>

<h3>Filter</h3>
<ul>
  <li>Checkbox to enable: when unchecked, raw data passes through unfiltered</li>
  <li>Method dropdown (Butterworth, Savitzky-Golay, EMA, etc.)</li>
</ul>
<p>Useful for smoothing noisy signals before visualization.</p>

<h2 id="output">Output & Run</h2>
<ul>
  <li><strong>2D Plot LED</strong>: toggle on/off. When green, generates 2D time-series plots.</li>
  <li><strong>3D Track LED</strong>: toggle on/off. When green, generates 3D track visualization with ghost cars.</li>
  <li><strong>Run button</strong>: executes the workflow on all checked items in the summary tree</li>
  <li><strong>Run Recent button</strong>: finds the most recent .ibt file in your iRacing telemetry folder and runs it immediately (one-click latest session analysis)</li>
</ul>

<div class="callout tip">
  <span class="ic">&#10003;</span>
  <div>
    <span class="lbl">Tip</span>
    <p><strong>Run Recent</strong> is the fastest path from "I just finished a session" to "I'm looking at the data." It auto-finds the newest IBT file and runs the full pipeline with one click.</p>
  </div>
</div>

<h2 id="running">Running</h2>
<p>The workflow runs in a background thread with a progress indicator. You can:</p>
<ul>
  <li>Watch the status label for progress ("Loading file 2 of 5…")</li>
  <li>Stop execution at any time with F12</li>
  <li>Results appear in the plot tabs above the graph area</li>
  <li>The dashboard panel populates with gauge values synced to the cursor</li>
</ul>
<p>Each run is saved to the <strong>Run Store</strong> (bottom panel) so you can switch between different runs to compare results.</p>
`
},

// ─────────────────────────────────────────────────────────────────
// 02: NODE REFERENCE
// ─────────────────────────────────────────────────────────────────

'nodes.load-data': {
  section: 'Node Reference',
  title: 'Load Data',
  lede: 'Read iRacing IBT telemetry files from disk with automatic segmentation and train/test splitting.',
  prev: ['gs.workflow-panel', 'Workflow Panel'],
  next: ['nodes.output', 'Output'],
  toc: ['overview', 'params', 'segmentation', 'splitting', 'formats', 'output'],
  tocLabels: ['Overview', 'Parameters', 'Segmentation Modes', 'Train/Test Splitting', 'File Formats', 'Output Format'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Load Data</strong> node is the primary data source for offline analysis. It reads iRacing IBT (binary telemetry) files, auto-detects driving stints, segments them by your chosen strategy, performs train/test splitting, and outputs structured data ready for downstream nodes.</p>
<ul>
  <li><strong>Category:</strong> Data</li>
  <li><strong>Input:</strong> None</li>
  <li><strong>Output:</strong> <code>TrainData</code> (training_dict)</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>IBT Folder</strong>: path to folder or single file. Accepts IBT, CSV, or Parquet. Supports <code>~</code> home directory expansion.</li>
  <li><strong>Segmentation</strong>: how to split continuous data into segments (see below)</li>
  <li><strong>Short Stint</strong>: minimum stint duration in frames. Segments shorter than <code>short_stint × 60</code> samples are discarded.</li>
  <li><strong>Min Laps</strong>: minimum laps per segment (for lap-based segmentation modes)</li>
  <li><strong>Convert Files</strong>: auto-convert IBT/CSV to Parquet on first load for 10–50x faster future reads</li>
  <li><strong>Track ID</strong>: track identifier for geometry lookup. Set to <code>__auto__</code> for automatic matching from session metadata.</li>
  <li><strong>Track Library Folder</strong>: path to track JSON files for centerline/sector data</li>
  <li><strong>Clean Clock</strong>: fix iRacing SessionTime column jitter by interpolating gaps (strongly recommended)</li>
  <li><strong>Comparison Source</strong>: optional second folder/file for comparison data (loaded independently)</li>
</ul>

<h2 id="segmentation">Segmentation Modes</h2>
<p>Controls how continuous telemetry is split into discrete segments:</p>
<ul>
  <li><strong>stint</strong>: split by continuous on-track runs (uses <code>EnterExitReset</code> signal: 1/2 = on-track, 0 = off-track)</li>
  <li><strong>tire_change</strong>: split when tire wear values change (detects <code>LFwearL</code> transitions)</li>
  <li><strong>pit</strong>: split at pit stop boundaries (rising edges of <code>PitstopActive</code>)</li>
  <li><strong>best_lap</strong>: extract only the best individual laps by time</li>
  <li><strong>lap</strong>: split into individual laps within each stint (from <code>LapDistPct</code> zero crossings)</li>
</ul>

<div class="callout note">
  <span class="ic">i</span>
  <div>
    <span class="lbl">Fallback chain</span>
    <p>If the requested segmentation mode yields no segments, Load Data tries a fallback chain: tire_change → pit → stint → whole file. This ensures you always get data even if the session didn't have tire changes or pit stops.</p>
  </div>
</div>

<h2 id="splitting">Train/Test Splitting</h2>
<p>Once segments are identified, Load Data splits them into training and test sets:</p>
<ul>
  <li><strong>Static</strong>: first N% of segments become test, the rest become train (ordered by time)</li>
  <li><strong>Random</strong>: segments are shuffled with a configurable seed, then split by percentage</li>
  <li><strong>Custom</strong>: manually assign each segment as "train" or "test" via a per-segment list</li>
</ul>
<p><strong>Split Percentage</strong> (default 50%) controls the ratio. <strong>Split Seed</strong> makes random splits reproducible across runs.</p>

<h2 id="formats">File Formats</h2>
<p>When a folder contains multiple formats of the same session, Load Data uses this priority: <strong>Parquet > CSV > IBT</strong>. This means once you've converted to Parquet, the IBT is no longer read.</p>
<ul>
  <li><strong>IBT</strong>: iRacing binary telemetry. Parsed via the built-in IBT parser. GPS coordinates are auto-interpolated when values are 0.</li>
  <li><strong>CSV</strong>: comma-separated values (exported from iRacing or third-party tools)</li>
  <li><strong>Parquet</strong>: Apache Arrow columnar format. 10–50x faster reads than IBT. Generated automatically when <code>Convert Files</code> is enabled.</li>
</ul>

<h2 id="output">Output Format</h2>
<p>The output <code>TrainData</code> dictionary contains:</p>
<ul>
  <li><code>train.df_segments</code>: list of DataFrames (one per training segment)</li>
  <li><code>test.df_segments</code>: list of DataFrames (one per test segment)</li>
  <li><code>comparison.df_segments</code>: optional comparison data (if comparison source set)</li>
  <li><code>track_xyz</code>: Nx3 NumPy array of track centerline coordinates</li>
  <li><code>track_mesh</code>: track barrier/curb geometry (if available)</li>
  <li><code>latlonalt0</code>: GPS origin tuple (lat, lon, alt) for coordinate conversion</li>
  <li><code>meta</code>: session metadata: track name, car, split info, segment counts, etc.</li>
</ul>
`
},

'nodes.output': {
  section: 'Node Reference',
  title: 'Output',
  lede: 'Visualize telemetry data as 2D plots, 3D track views, waterfall, and spectrogram.',
  prev: ['nodes.load-data', 'Load Data'],
  next: ['nodes.aux-math', 'Aux Math'],
  toc: ['overview', 'leds', 'data-flow', 'usage'],
  tocLabels: ['Overview', 'Plot Toggles', 'Data Flow', 'Usage'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Output</strong> node (also called Combined Plot) is the visualization endpoint of any graph. It receives processed data and generates interactive plot tabs. Multiple plot types can be generated simultaneously from a single Output node.</p>
<ul>
  <li><strong>Category:</strong> Output</li>
  <li><strong>Input:</strong> <code>Data</code> (var_dict)</li>
  <li><strong>Output:</strong> None (creates plot tabs)</li>
</ul>

<h2 id="leds">Plot Toggles</h2>
<p>The Output node has LED toggle buttons on its right side that control which visualizations are generated:</p>
<ul>
  <li><strong>Plot 2D</strong>: time-series line plots with interactive cursor, legend, segment overlay, and unit conversion. Enabled by default.</li>
  <li><strong>Track 3D</strong>: 3D OpenGL track visualization with car mesh, ghost laps, color-mapped driving lines, and playback. Enabled by default.</li>
</ul>
<p>Click an LED to toggle it on/off before running the graph. Disabled plot types are skipped during execution for faster runs.</p>

<h2 id="data-flow">Data Flow</h2>
<p>The Output node accepts a <code>var_dict</code> (set_dict) which may contain:</p>
<ul>
  <li><strong>TrainData / TestData / Data</strong>: segment groups</li>
  <li><strong>Raw</strong>: original telemetry values</li>
  <li><strong>Pred</strong>: model predictions (from Model node)</li>
  <li><strong>Val</strong>: validation values (from Extract Set)</li>
  <li><strong>AuxMath</strong>: computed channels (from Aux Math)</li>
  <li><strong>Error</strong>: prediction error (Pred − Raw)</li>
</ul>
<p>All present branches are rendered in the plots. The legend and variable tree let you show/hide individual branches and channels interactively.</p>

<h2 id="usage">Usage</h2>
<p>Connect any node that outputs a <code>Data</code> (var_dict) type: Model, Extract Set, Filter, or Aux Math. The Output node renders whatever is present. For a simple telemetry view without ML, use <strong>Load Data → Extract Set → Output</strong>.</p>
`
},

'nodes.aux-math': {
  section: 'Node Reference',
  tier: 'pro',
  title: 'Aux Math',
  lede: 'Create custom computed channels using NumPy expressions with per-segment evaluation.',
  prev: ['nodes.output', 'Output'],
  next: ['nodes.filter', 'Filter'],
  toc: ['overview', 'syntax', 'functions', 'examples', 'params'],
  tocLabels: ['Overview', 'Expression Syntax', 'Available Functions', 'Examples', 'Parameters'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Aux Math</strong> node lets you create new telemetry channels from mathematical expressions applied to existing channels. Expressions are evaluated per-segment (each segment gets its own array). Results are stored in the AuxMath sub-branch of the data.</p>
<ul>
  <li><strong>Category:</strong> Transform</li>
  <li><strong>Input:</strong> <code>Data</code> (set_dict)</li>
  <li><strong>Output:</strong> <code>Data</code> (set_dict with AuxMath entries added)</li>
</ul>

<h2 id="syntax">Expression Syntax</h2>
<ul>
  <li>One expression per line</li>
  <li>Reference variables with backticks: <code>\`VelocityX\`</code></li>
  <li>Lines starting with <code>@</code> are <strong>outputs</strong> (saved to AuxMath branch): <code>@speed = sqrt(\`VelocityX\`**2)</code></li>
  <li>Lines without <code>@</code> are <strong>temporaries</strong> (carried forward within the program but not saved)</li>
  <li>Comments: lines starting with <code>#</code> are ignored (but <code>#</code> inside backticks is preserved)</li>
</ul>

<h2 id="functions">Available Functions</h2>
<p>The expression namespace includes:</p>
<ul>
  <li><strong>NumPy</strong>: all <code>np.*</code> functions: <code>sqrt</code>, <code>sin</code>, <code>cos</code>, <code>tan</code>, <code>exp</code>, <code>log</code>, <code>abs</code>, <code>clip</code>, <code>max</code>, <code>min</code>, <code>mean</code>, <code>std</code>, <code>where</code>, <code>interp</code>, etc.</li>
  <li><strong>Math constants</strong>: <code>pi</code>, <code>e</code></li>
  <li><strong>Rolling helpers</strong> (60 Hz default):
    <ul>
      <li><code>rolling_max(arr, window_sec, dt=1/60)</code>: rolling maximum over window</li>
      <li><code>rolling_min(arr, window_sec, dt=1/60)</code>: rolling minimum over window</li>
      <li><code>rolling_mean(arr, window_sec, dt=1/60)</code>: rolling average over window</li>
    </ul>
  </li>
  <li><strong>diff(arr)</strong>: first-order difference with prepend (same length as input)</li>
</ul>

<h2 id="examples">Examples</h2>
<div class="code-block">
  <div class="ch">
    <div style="display:flex;align-items:center;gap:12px;"><div class="dots"><span></span><span></span><span></span></div><span>Aux Math Expressions</span></div>
    <button class="copy">Copy</button>
  </div>
<pre><span class="c"># Compute speed magnitude from velocity components</span>
<span class="k">@speed</span> = sqrt(<span class="s">\`VelocityX\`</span>**2 + <span class="s">\`VelocityY\`</span>**2 + <span class="s">\`VelocityZ\`</span>**2)

<span class="c"># G-force magnitude</span>
<span class="k">@total_g</span> = sqrt(<span class="s">\`LatAccel\`</span>**2 + <span class="s">\`LongAccel\`</span>**2)

<span class="c"># Smoothed speed (100ms window at 60Hz)</span>
<span class="k">@speed_smooth</span> = rolling_mean(<span class="s">\`Speed\`</span>, <span class="n">0.1</span>)

<span class="c"># Brake pressure derivative (brake application rate)</span>
<span class="k">@brake_rate</span> = diff(<span class="s">\`Brake\`</span>) * <span class="n">60</span>

<span class="c"># Temporary variable (not saved)</span>
tmp = <span class="s">\`Throttle\`</span> - <span class="s">\`Brake\`</span>
<span class="k">@pedal_balance</span> = clip(tmp, <span class="n">-1</span>, <span class="n">1</span>)
</pre>
</div>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Expression</strong>: multi-line expression editor (the program)</li>
  <li><strong>Branch</strong>: which data branches to apply to: <code>All</code>, <code>Train</code>, or <code>Test</code></li>
  <li><strong>Channel In</strong>: variable resolution order:
    <ul>
      <li><code>Auto</code>: searches Raw → Pred → Val → Error → AuxMath</li>
      <li>Specific name: prefer that channel, then fallback</li>
      <li>Comma-separated: explicit priority order</li>
    </ul>
  </li>
</ul>
`
},

'nodes.filter': {
  section: 'Node Reference',
  tier: 'pro',
  title: 'Filter',
  lede: 'Apply smoothing and signal processing filters to telemetry channels.',
  prev: ['nodes.aux-math', 'Aux Math'],
  next: ['nodes.model', 'Model'],
  toc: ['overview', 'methods', 'ema', 'one-euro', 'butterworth', 'other', 'params'],
  tocLabels: ['Overview', 'Filter Methods', 'EMA', 'One Euro', 'Butterworth', 'Integrate & Differentiate', 'Parameters'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Filter</strong> node applies signal processing filters to all numeric variables in selected data branches. Use it to smooth noisy telemetry, remove spikes, integrate/differentiate signals, or prepare clean targets for ML training.</p>
<ul>
  <li><strong>Category:</strong> Transform</li>
  <li><strong>Input:</strong> <code>Data</code> (set_dict)</li>
  <li><strong>Output:</strong> <code>Data</code> (set_dict with filtered values replacing originals)</li>
</ul>
<p>Filters are applied per-variable per-segment independently. Arrays are treated as [T, V] where T = time samples and V = variable values.</p>

<h2 id="methods">Filter Methods</h2>
<ul>
  <li><strong>None (passthrough)</strong>: no filtering applied</li>
  <li><strong>EMA</strong>: exponential moving average (causal, introduces phase lag)</li>
  <li><strong>EMA (fwd-bwd)</strong>: bidirectional EMA for zero-phase filtering (non-causal)</li>
  <li><strong>MA (centered)</strong>: centered moving average with reflected edge padding</li>
  <li><strong>Median (centered)</strong>: median filter for removing spikes without broadening edges</li>
  <li><strong>One Euro</strong>: adaptive low-latency filter (cutoff increases with signal velocity)</li>
  <li><strong>Butterworth (IIR)</strong>: classic low-pass with sharp rolloff, uses SOS for stability</li>
  <li><strong>Integrate (cumtrapz)</strong>: cumulative trapezoidal integration</li>
  <li><strong>Differentiate (diff)</strong>: first-order finite difference</li>
</ul>

<h2 id="ema">EMA (Exponential Moving Average)</h2>
<p>A simple first-order IIR filter controlled by a time constant <strong>tau</strong>:</p>
<ul>
  <li><code>alpha = 1 - exp(-dt / tau)</code></li>
  <li><code>y[n] = (1 - alpha) * y[n-1] + alpha * x[n]</code></li>
  <li>Larger tau = more smoothing, more lag</li>
  <li>The fwd-bwd variant runs the filter forward then backward, eliminating phase lag (best for offline analysis)</li>
</ul>

<h2 id="one-euro">One Euro Filter</h2>
<p>An adaptive filter that smooths slow signals heavily but preserves fast transients. Ideal for telemetry with both slow drifts and fast events (e.g., brake pressure).</p>
<ul>
  <li><strong>min_cutoff</strong>: minimum cutoff frequency in Hz (lower = more smoothing for slow signals)</li>
  <li><strong>beta</strong>: responsiveness to speed. Higher beta makes the filter track fast changes more closely.</li>
  <li><strong>d_cutoff</strong>: cutoff for the derivative estimator (Hz)</li>
  <li>Formula: <code>fc = min_cutoff + beta × |dx/dt|</code></li>
</ul>

<h2 id="butterworth">Butterworth (IIR)</h2>
<p>A classic analog-derived low-pass filter with maximally flat passband:</p>
<ul>
  <li><strong>Order</strong>: filter steepness (2–4 typical). Higher order = sharper cutoff but more phase distortion.</li>
  <li><strong>Cutoff Hz</strong>: -3 dB frequency. For 60 Hz telemetry, values of 1–10 Hz are typical.</li>
  <li>Implementation uses second-order sections (SOS) for numerical stability</li>
</ul>

<h2 id="other">Integrate & Differentiate</h2>
<ul>
  <li><strong>Integrate</strong>: cumulative trapezoidal rule. Set the initial value (default 0). Useful for computing distance from speed, or angle from angular velocity.</li>
  <li><strong>Differentiate</strong>: first-order finite difference scaled by dt. First sample is forward-filled. Useful for computing acceleration from speed, or rate of change from any signal.</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Method</strong>: which filter algorithm to apply</li>
  <li><strong>Branch Mode</strong>: <code>All</code>, <code>Train</code>, or <code>Test</code></li>
  <li><strong>Channel Selection</strong>: checkboxes for which branches to filter: Pred, Val, Error, AuxMath</li>
  <li><strong>Tau</strong>: EMA time constant in seconds (default depends on signal)</li>
  <li><strong>Window</strong>: window size in samples for MA/Median (auto-forced to odd)</li>
  <li><strong>One Euro params</strong>: min_cutoff, beta, d_cutoff</li>
  <li><strong>Butterworth params</strong>: order (2–4), cutoff_hz</li>
  <li><strong>dt</strong>: sample period (default 1/60 for 60 Hz telemetry)</li>
</ul>
`
},

'nodes.model': {
  section: 'Node Reference',
  tier: 'studio',
  title: 'Model',
  lede: 'Train neural networks (MLP, GRU, TCN, Transformer) and run inference on telemetry data.',
  prev: ['nodes.filter', 'Filter'],
  next: ['nodes.extract-set', 'Extract Set'],
  toc: ['overview', 'architectures', 'training', 'loss', 'params', 'output'],
  tocLabels: ['Overview', 'Architectures', 'Training Loop', 'Loss Functions', 'Parameters', 'Output'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Model</strong> node is the ML core of LapLabs. It trains neural networks on telemetry data, runs inference on both train and test splits, and stores predictions in the Pred branch for comparison against raw ground truth.</p>
<ul>
  <li><strong>Category:</strong> Transform</li>
  <li><strong>Input:</strong> <code>TrainData</code> (training_dict)</li>
  <li><strong>Output:</strong> <code>Data</code> (var_dict with Raw + Pred + Val + Error branches)</li>
</ul>

<h2 id="architectures">Architectures</h2>
<ul>
  <li><strong>Linear / Ridge</strong>: closed-form least-squares regression with optional L2 regularization (lambda parameter). Instant training, good baseline. Use <code>ridge_lambda</code> to control regularization strength.</li>
  <li><strong>MLP</strong>: multi-layer perceptron. Configurable width, depth, and activation. The workhorse architecture for most telemetry prediction tasks.</li>
  <li><strong>GRU</strong>: gated recurrent unit. Unfolds <code>hist_len</code> timesteps of history. Good for modeling temporal dependencies (e.g., tire wear evolution).</li>
  <li><strong>TCN</strong>: temporal convolutional network with causal dilated convolutions. Configurable kernel size. Parallelizable and fast. Good alternative to GRU for long sequences.</li>
  <li><strong>Transformer</strong>: encoder-only transformer with multi-head self-attention. Parameters: d_model, nhead, dim_feedforward, dropout. Best for complex multi-variable interactions with long history.</li>
</ul>

<h2 id="training">Training Loop</h2>
<ol>
  <li><strong>Standardization:</strong> Input X is normalized to zero mean, unit variance. Stats (x_mean, x_std, y_mean, y_std) are saved in the model bundle for inference.</li>
  <li><strong>Model construction:</strong> Architecture is built from parameters (input_dim, output_dim, hidden_width, num_layers, etc.)</li>
  <li><strong>For linear models:</strong> Closed-form solution via pseudo-inverse (or ridge solver with lambda)</li>
  <li><strong>For neural networks:</strong>
    <ul>
      <li>Data split into minibatches of <code>batch_size</code></li>
      <li>Loop over <code>epochs</code></li>
      <li>Compute loss → backprop → optimizer step</li>
      <li>Optional early stopping on validation loss</li>
    </ul>
  </li>
  <li><strong>Inference:</strong> Runs on both train and test splits. Predictions denormalized using saved stats.</li>
</ol>

<h2 id="loss">Loss Functions</h2>
<ul>
  <li><strong>MSE</strong>: mean squared error. Penalizes large errors heavily.</li>
  <li><strong>MAE</strong>: mean absolute error. More robust to outliers.</li>
  <li><strong>SmoothL1</strong> (default): quadratic near zero, linear far away. Configurable <code>beta</code> controls the transition point.</li>
  <li><strong>Huber</strong>: similar to SmoothL1 with configurable <code>delta</code> threshold.</li>
</ul>

<h2 id="params">Parameters</h2>
<h3>Architecture</h3>
<ul>
  <li><strong>Model Kind</strong>: <code>mlp</code>, <code>linear</code>, <code>ridge</code>, <code>gru</code>, <code>tcn</code>, <code>transformer</code></li>
  <li><strong>Hidden Width</strong>: neurons per hidden layer (default 64)</li>
  <li><strong>Num Layers</strong>: hidden layer count (default 2)</li>
  <li><strong>History Length</strong>: temporal window for sequence models. 1 = memoryless MLP.</li>
  <li><strong>Activation</strong>: hidden activation: ReLU, Tanh, Sigmoid, LeakyReLU</li>
  <li><strong>Output Activation</strong>: output layer activation: None, ReLU, Softplus, etc.</li>
</ul>
<h3>Training</h3>
<ul>
  <li><strong>Train Enabled</strong>: whether to train or just load an existing model</li>
  <li><strong>Optimizer</strong>: Adam (default) or SGD</li>
  <li><strong>Learning Rate</strong>: default 1e-3</li>
  <li><strong>Epochs</strong>: training iterations (default 10)</li>
  <li><strong>Batch Size</strong>: default 512</li>
  <li><strong>Device</strong>: <code>cpu</code> or <code>gpu</code> (auto-fallback to CPU if CUDA unavailable)</li>
  <li><strong>Loss</strong>: MSE, MAE, SmoothL1, Huber</li>
</ul>
<h3>Sequence Models (GRU/TCN/Transformer)</h3>
<ul>
  <li><strong>TCN Kernel</strong>: convolutional kernel size (default 3)</li>
  <li><strong>d_model</strong>: transformer model dimension (default 64)</li>
  <li><strong>nhead</strong>: number of attention heads (default 4)</li>
  <li><strong>Dropout</strong>: transformer dropout rate (default 0.1)</li>
</ul>

<h2 id="output">Output</h2>
<p>The output set_dict contains predictions alongside raw data for every segment:</p>
<ul>
  <li><code>TrainData/Pred</code>: model predictions on training segments</li>
  <li><code>TrainData/Raw</code>: raw ground truth for comparison</li>
  <li><code>TestData/Pred</code> and <code>TestData/Raw</code>: same for test split</li>
  <li><code>Error</code>: Pred minus Raw (per-variable per-segment)</li>
  <li>Metadata: model parameters, final loss, test loss, training time</li>
</ul>
`
},

'nodes.extract-set': {
  section: 'Node Reference',
  title: 'Extract Set',
  lede: 'Build a visualization-ready dataset from raw telemetry without training a model.',
  prev: ['nodes.model', 'Model'],
  next: ['plot.2d', '2D Plots'],
  toc: ['overview', 'templates', 'extraction', 'output'],
  tocLabels: ['Overview', 'Templates', 'What Gets Extracted', 'Output Structure'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Extract Set</strong> node pulls a curated set of variables from training data and packages them into a visualization-ready set_dict, without any ML training. Use it when you want to visualize specific channels, feed the dashboard, or export data.</p>
<ul>
  <li><strong>Category:</strong> Data</li>
  <li><strong>Input:</strong> <code>TrainData</code> (training_dict)</li>
  <li><strong>Output:</strong> <code>Data</code> (var_dict with Val + Raw branches)</li>
</ul>

<h2 id="templates">Templates</h2>
<p>Extract templates define which variables to include. Select from built-in presets or add channels manually:</p>
<ul>
  <li><strong>dash</strong>: core dashboard variables (Speed, Throttle, Brake, Gear, RPM, Steering)</li>
  <li><strong>tiretemps</strong>: tire temperature channels (inner/middle/outer per corner)</li>
  <li><strong>suspension</strong>: shock deflection, ride height, spring loads</li>
  <li><strong>raw</strong>: all available columns (full extraction)</li>
</ul>
<p>The <strong>Extra Channels</strong> parameter lets you add specific columns beyond the template selection.</p>

<h2 id="extraction">What Gets Extracted</h2>
<p>For each segment (train + test combined, deduplicated), Extract Set builds:</p>
<ul>
  <li><strong>Position (POS):</strong> XYZ world coordinates, Roll/Pitch/Yaw, LapDistPct, SessionTime, lap number, lap time, incidents</li>
  <li><strong>Telemetry (Telem):</strong> Brake, Clutch, Gear, RPM, SteeringWheelAngle, Throttle, plus wheel speeds and shock deflection per corner</li>
  <li><strong>Data:</strong> Template-selected channels (tire temps, pressures, custom variables)</li>
</ul>

<h2 id="output">Output Structure</h2>
<p>Unlike the Model node, Extract Set produces Val and Raw branches (no Pred or Error):</p>
<ul>
  <li><code>Data/AuxMath</code>: template-selected Val channels + Telem + POS</li>
  <li><code>Data/Raw</code>: all raw DataFrame columns + Telem + POS</li>
  <li><code>ComparisonData</code>: same structure if comparison segments were provided in the Load Data node</li>
  <li>Passes through <code>track_xyz</code>, <code>latlonalt0</code>, and <code>meta</code></li>
</ul>
`
},

// ─────────────────────────────────────────────────────────────────
// 03: PLOTTING & VISUALIZATION
// ─────────────────────────────────────────────────────────────────

'plot.2d': {
  section: 'Plotting & Visualization',
  title: '2D Plots',
  lede: 'Interactive time-series plots with multi-segment overlay, cursor sync, and variable tree.',
  prev: ['nodes.extract-set', 'Extract Set'],
  next: ['plot.3d', '3D Plots'],
  toc: ['overview', 'x-axis', 'variable-tree', 'segments', 'cursor', 'toolbar', 'units'],
  tocLabels: ['Overview', 'X-Axis Modes', 'Variable Tree', 'Multi-Segment Overlay', 'Cursor Sync', 'Toolbar', 'Unit Conversion'],
  body: `
<h2 id="overview">Overview</h2>
<p>2D plots display telemetry channels as time-series line charts with full interactive controls. Multiple segments can be overlaid for lap comparison. Variables are organized in a tree with per-branch toggles and per-variable solo/delta buttons.</p>
<ul>
  <li><strong>Zoom:</strong> Scroll wheel (X and Y independently with Ctrl/Shift)</li>
  <li><strong>Pan:</strong> Left-click drag</li>
  <li><strong>Reset view:</strong> Right-click → Auto Range</li>
</ul>

<h2 id="x-axis">X-Axis Modes</h2>
<p>The toolbar toggles between two X-axis representations:</p>
<ul>
  <li><strong>Lap Distance %</strong>: 0 to 100%, normalized per lap. Best for comparing cornering performance across laps.</li>
  <li><strong>Session Time</strong>: absolute time in seconds. Best for viewing temporal patterns, stint evolution, or multi-lap sequences.</li>
</ul>
<p>Segments are placed contiguously on the X-axis with red boundary lines marking transitions between segments.</p>

<h2 id="variable-tree">Variable Tree</h2>
<p>The left panel shows a hierarchical variable tree with two main sections:</p>
<ul>
  <li><strong>Segments section:</strong> Checkboxes per segment, grouped under branch labels (Train/Test/Data/Comparison). Check/uncheck to show/hide individual segments.</li>
  <li><strong>Variables section:</strong> Multi-select with per-variable controls:
    <ul>
      <li><strong>S button</strong>: solo this variable (hide all others)</li>
      <li><strong>Δ button</strong>: delta mode (difference between two overlaid segments)</li>
      <li><strong>Pred/Val toggle</strong>: switch between Pred and Val display for that variable</li>
    </ul>
  </li>
</ul>
<p>Variables are grouped by branch: Pred, Val, AuxMath, Error. All can be toggled independently.</p>

<h2 id="segments">Multi-Segment Overlay</h2>
<p>When multiple segments are loaded (e.g., different laps, train vs test), they overlay on the same axes. This enables direct comparison of driving technique, model fit, or parameter evolution across segments.</p>
<p>Comparison data (from the Load Data node's comparison source) is automatically aligned to the primary segment's lap 1 for synchronized overlay.</p>

<h2 id="cursor">Cursor Sync</h2>
<p>A vertical cursor line syncs across all 2D plot tabs and drives downstream panels:</p>
<ul>
  <li>Dashboard gauges interpolate values at the cursor's position</li>
  <li>3D plot car position matches the cursor time</li>
  <li>Waterfall plot highlights the current time position</li>
</ul>

<h2 id="toolbar">Toolbar</h2>
<ul>
  <li><strong>X-axis mode</strong>: toggle Lap Distance / Session Time</li>
  <li><strong>Y-axis scale</strong>: Linear or Log</li>
  <li><strong>Auto-range</strong>: fit all visible data to view</li>
</ul>

<h2 id="units">Unit Conversion</h2>
<p>Dashboard elements and plots support unit conversion presets:</p>
<ul>
  <li>Speed: m/s ↔ mph ↔ km/h</li>
  <li>Temperature: °C ↔ °F</li>
  <li>Pressure: kPa ↔ psi</li>
  <li>Angles: radians ↔ degrees</li>
  <li>Distance: m ↔ ft</li>
</ul>
`
},

'plot.3d': {
  section: 'Plotting & Visualization',
  title: '3D Plots',
  lede: 'OpenGL track visualization with car meshes, ghost laps, color-mapped driving lines, and playback.',
  prev: ['plot.2d', '2D Plots'],
  next: ['plot.waterfall', 'Waterfall'],
  toc: ['overview', 'navigation', 'variable-tree', 'color-mapping', 'ghosts', 'playback', 'toolbar'],
  tocLabels: ['Overview', 'Navigation', 'Variable Tree', 'Color Mapping', 'Ghost Laps', 'Playback', 'Toolbar Controls'],
  body: `
<h2 id="overview">Overview</h2>
<p>The 3D plot renders the track surface with car position, driving line traces, and ghost lap overlays using hardware-accelerated OpenGL via pyqtgraph's GLViewWidget. It syncs with the 2D plot cursor and supports full playback with follow-camera.</p>

<h2 id="navigation">Navigation</h2>
<ul>
  <li><strong>Rotate:</strong> Left-click drag</li>
  <li><strong>Pan:</strong> Middle-click drag</li>
  <li><strong>Zoom:</strong> Scroll wheel</li>
  <li><strong>Follow cam:</strong> Locks camera to the current car position during playback</li>
</ul>

<h2 id="variable-tree">Variable Tree</h2>
<p>The 3D plot has its own variable tree (left sidebar), different from the 2D tree:</p>
<ul>
  <li><strong>Segments:</strong> Same as 2D, checkboxes to show/hide individual segments</li>
  <li><strong>Variables:</strong> <strong>Exclusive single-select</strong>: only one variable at a time maps to trace color (unlike 2D which allows multi-select)</li>
  <li><strong>S button:</strong> Solo highlights current variable</li>
  <li><strong>Pred/Val toggle:</strong> Switch which branch drives the color mapping</li>
</ul>

<h2 id="color-mapping">Color Mapping</h2>
<p>The driving line trace is color-coded by the selected variable's value. For example, select "Speed" to see fast/slow sections, or "Brake" to see braking zones highlighted.</p>
<ul>
  <li><strong>Color Max / Min:</strong> Adjustable-increment spinboxes set the colorbar range</li>
  <li><strong>Auto-scale:</strong> Button to automatically fit color range to the data</li>
  <li><strong>Scale mode:</strong> Linear or Log color mapping</li>
</ul>
<p>The trace truncates at the current playhead position during playback; only the "past" portion is visible.</p>

<h2 id="ghosts">Ghost Laps</h2>
<p>When multiple segments are loaded, ghost car meshes render at each segment's current playback position. This lets you directly see how different laps compare on track.</p>
<ul>
  <li>Ghosts use a C DLL for fast batch rendering via OpenGL display lists</li>
  <li>Up to 32+ simultaneous ghost cars</li>
  <li>Each ghost uses the car model from the Vehicle Library</li>
  <li>Ghost positions include full 6-DOF: position (XYZ) + orientation (Roll, Pitch, Yaw)</li>
</ul>

<h2 id="playback">Playback</h2>
<ul>
  <li><strong>Play/Pause</strong>: animate all cars around the track</li>
  <li><strong>Speed slider</strong>: 0.1x to 10x playback speed</li>
  <li><strong>Frame stepping</strong>: advance one tick at a time</li>
  <li>Playback syncs with the 2D cursor and dashboard</li>
</ul>

<h2 id="toolbar">Toolbar Controls</h2>
<ul>
  <li><strong>Color variable selector</strong>: which channel maps to trace color</li>
  <li><strong>Color Max / Min spinboxes</strong>: adjustable-increment (step = 10^exponent)</li>
  <li><strong>Auto-scale button</strong>: fit color range to visible data</li>
  <li><strong>Track texture toggle</strong>: show/hide road surface texture</li>
  <li><strong>Start/finish line</strong>: show/hide the S/F marker</li>
  <li><strong>Playback controls</strong>: play, pause, speed, frame step</li>
  <li><strong>Screenshot</strong>: capture current view</li>
</ul>
`
},

'plot.waterfall': {
  section: 'Plotting & Visualization',
  tier: 'studio',
  title: 'Waterfall',
  lede: 'Multi-lap stacked 3D surface for comparing lap-to-lap evolution of any channel.',
  prev: ['plot.3d', '3D Plots'],
  next: ['plot.spectrogram', 'Spectrogram'],
  toc: ['overview', 'axes', 'toolbar', 'playback'],
  tocLabels: ['Overview', 'Axis Layout', 'Toolbar Controls', 'Playback'],
  body: `
<h2 id="overview">Overview</h2>
<p>The waterfall plot stacks multiple segments in 3D space, making it easy to spot lap-to-lap trends. Each segment appears as a colored line strip offset in the Y-direction. This is ideal for visualizing tire degradation, fuel-load effects, or consistency patterns.</p>

<h2 id="axes">Axis Layout</h2>
<ul>
  <li><strong>X-axis:</strong> Lap distance (0–100%)</li>
  <li><strong>Z-axis:</strong> Variable value (amplitude)</li>
  <li><strong>Y-axis:</strong> Segment index (each lap offset vertically)</li>
</ul>
<p>The Y-scale is adaptive: <code>y_scale = sqrt(2) / session_length_hours</code>, so shorter sessions spread laps further apart for clarity.</p>

<h2 id="toolbar">Toolbar Controls</h2>
<ul>
  <li><strong>Y-scale spinner</strong>: adjust separation between stacked segments</li>
  <li><strong>Z-scale spinner</strong>: adjust variable amplitude scaling</li>
  <li><strong>Color auto-scale</strong>: fit colorbar to data range</li>
  <li><strong>Color max/min</strong>: manual color range control</li>
</ul>

<h2 id="playback">Playback</h2>
<p>During playback, future samples (past the cursor) are greyed out on each lap. The current time position sweeps across all laps simultaneously, so you can see exactly where each lap is relative to the cursor.</p>
<p>The waterfall renderer uses a C DLL (<code>wf_update_colors</code>) for batch color updates at full playback speed.</p>
`
},

'plot.spectrogram': {
  section: 'Plotting & Visualization',
  tier: 'studio',
  title: 'Spectrogram',
  lede: 'Frequency-domain STFT analysis of telemetry signals over time.',
  prev: ['plot.waterfall', 'Waterfall'],
  next: ['plot.scatter', 'Scatter Panel'],
  toc: ['overview', 'params', 'usage'],
  tocLabels: ['Overview', 'Parameters', 'Use Cases'],
  body: `
<h2 id="overview">Overview</h2>
<p>The spectrogram plot shows the frequency content of telemetry signals over time using Short-Time Fourier Transform (STFT). It renders a heatmap with time on one axis, frequency on the other, and color intensity representing signal power (dB).</p>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Window Size</strong>: STFT window in samples: 16, 32, 64, 128, 256, 512, or 1024. Larger windows = better frequency resolution but worse time resolution.</li>
  <li><strong>Overlap</strong>: 0–99%. Higher overlap gives smoother time transitions.</li>
  <li><strong>Frequency Max/Min</strong>: display range in Hz (0–30 Hz typical for 60 Hz data)</li>
  <li><strong>dB Ceil/Floor</strong>: color intensity range (-160 to 0 dB)</li>
  <li><strong>Colormap</strong>: CET-L1 (perceptually uniform) or viridis</li>
</ul>

<h2 id="usage">Use Cases</h2>
<ul>
  <li><strong>Suspension vibration:</strong> Plot shock deflection spectrograms to identify damper oscillation frequencies</li>
  <li><strong>Steering oscillation:</strong> Detect driver-induced steering oscillations or corrections</li>
  <li><strong>Engine harmonics:</strong> RPM-correlated vibration patterns in accelerometer data</li>
  <li><strong>Noise identification:</strong> Distinguish sensor noise from real signal content for choosing filter cutoff frequencies</li>
</ul>
<p>The variable tree allows per-variable spectrograms with multi-select (same as 2D plots).</p>
`
},

'plot.scatter': {
  section: 'Plotting & Visualization',
  tier: 'pro',
  title: 'Scatter Panel',
  lede: 'Plot any two or three variables against each other for correlation analysis.',
  prev: ['plot.spectrogram', 'Spectrogram'],
  next: ['plot.cursor', 'Cursor Sync & Legend'],
  toc: ['overview', 'usage', 'expressions', 'segments', 'scaling'],
  tocLabels: ['Overview', 'Usage', 'Expressions', 'Segment Selection', 'Axis Scaling'],
  body: `
<h2 id="overview">Overview</h2>
<p>The scatter panel sits below the dashboard in the right column. It plots variables against each other (rather than over time) to reveal correlations, clusters, and performance envelopes that aren't visible in time-series plots.</p>
<ul>
  <li><strong>2D mode:</strong> pyqtgraph ScatterPlotItem, fast interactive with zoom/pan</li>
  <li><strong>3D mode:</strong> pyqtgraph OpenGL GLScatterPlotItem, rotatable point cloud</li>
</ul>

<h2 id="usage">Usage</h2>
<ol>
  <li>Select <strong>Scatter 2D</strong> or <strong>Scatter 3D</strong> from the Type dropdown</li>
  <li>Type variable names into the X, Y (and Z for 3D) fields; autocomplete suggests all available channels from the current dataset</li>
  <li>Check/uncheck segments in the right sidebar to include or exclude them</li>
  <li>Click <strong>Plot</strong></li>
</ol>
<p>Each segment renders in a distinct color from an 8-color cycle (blue, red, lime, gold, purple, turquoise, orange, pink) for easy identification.</p>

<h2 id="expressions">Expressions</h2>
<p>Variable fields accept expressions in addition to plain channel names. The safe evaluation namespace includes all NumPy functions:</p>
<ul>
  <li><strong>Bare operators:</strong> <code>Speed * 0.621371</code> (auto-detected when operators present)</li>
  <li><strong>Backtick variables:</strong> <code>\`VelocityX\` ** 2 + \`VelocityY\` ** 2</code></li>
  <li><strong>Functions:</strong> <code>sqrt(\`LatAccel\` ** 2 + \`LongAccel\` ** 2)</code></li>
  <li><strong>Available:</strong> np, sqrt, sin, cos, tan, log, exp, abs, clip, min, max, pi</li>
</ul>

<h2 id="segments">Segment Selection</h2>
<p>The collapsible sidebar on the right of the scatter panel shows a tree of all available segments with checkboxes. All segments are checked by default. Uncheck specific segments to exclude them from the scatter plot. Useful for isolating train vs test, or comparing specific laps.</p>

<h2 id="scaling">Axis Scaling</h2>
<p>Each axis has an adjustable-increment spinbox (same control as the 3D plot toolbar). The exponent control sets the step size (10^n): low exponents for fine adjustment, high exponents for coarse.</p>
<p>Changing a scale value instantly re-renders the plot without re-clicking Plot. This enables real-time exploration of different value ranges.</p>
`
},

'plot.cursor': {
  section: 'Plotting & Visualization',
  title: 'Cursor Sync & Legend',
  lede: 'How cursor synchronization, variable trees, and plot legends work across all panels.',
  prev: ['plot.scatter', 'Scatter Panel'],
  next: ['dash.elements', 'Element Types'],
  toc: ['cursor', 'legend', 'sync-targets'],
  tocLabels: ['Cursor Sync', 'Legend & Variable Tree', 'Sync Targets'],
  body: `
<h2 id="cursor">Cursor Sync</h2>
<p>All 2D plot tabs share a synchronized vertical cursor. The cursor represents a single point in time (or lap distance). Moving it on any plot tab broadcasts the position to all connected panels.</p>
<p>The cursor is driven by mouse movement on any 2D plot. Click and drag horizontally to scrub through the data.</p>

<h2 id="legend">Legend & Variable Tree</h2>
<p>The variable tree (left panel of each plot type) provides full control over visibility:</p>
<ul>
  <li><strong>Click</strong> a channel name to toggle visibility</li>
  <li><strong>S button</strong>: solo: hide everything except this variable</li>
  <li><strong>Δ button</strong> (2D only): delta mode: show the difference between two overlaid segments</li>
  <li><strong>Pred/Val toggle</strong>: switch between predicted and validation values</li>
  <li>Channels are grouped by branch: Pred, Val, Raw, Error, AuxMath</li>
</ul>
<p>The 2D tree uses <strong>non-exclusive multi-select</strong> (multiple variables visible at once). The 3D tree uses <strong>exclusive single-select</strong> (one color-mapping variable at a time).</p>

<h2 id="sync-targets">Sync Targets</h2>
<p>When the cursor position changes, the following panels update:</p>
<ul>
  <li><strong>All 2D tabs</strong>: cursor line moves to matching position</li>
  <li><strong>Dashboard gauges</strong>: interpolate values at cursor time</li>
  <li><strong>3D plot</strong>: car mesh moves to cursor position on track</li>
  <li><strong>Waterfall plot</strong>: grey-out everything past cursor</li>
</ul>
<p>Dashboard refresh rate is configurable: 15, 30, 60, or 120 Hz (higher = smoother but more CPU).</p>
`
},

// ─────────────────────────────────────────────────────────────────
// 04: DASHBOARDS
// ─────────────────────────────────────────────────────────────────

'dash.elements': {
  section: 'Dashboards',
  tier: 'pro',
  title: 'Element Types',
  lede: 'All 13 dashboard elements: gauges, bars, LEDs, steering wheels, minimaps, and more.',
  prev: ['plot.cursor', 'Cursor Sync & Legend'],
  next: ['dash.designer', 'Dashboard Designer'],
  toc: ['overview', 'common', 'gauges', 'displays', 'indicators', 'specialty'],
  tocLabels: ['Overview', 'Common Properties', 'Gauges & Meters', 'Displays', 'Indicators', 'Specialty Elements'],
  body: `
<h2 id="overview">Overview</h2>
<p>Dashboard elements are the visual building blocks of a dash layout. Each element binds to a telemetry variable and displays its value in real-time. Elements are registered via the <code>@register_element</code> decorator and inherit from <code>DashElement(QGraphicsItem)</code>.</p>

<h2 id="common">Common Properties</h2>
<p>All elements share these configurable properties:</p>
<ul>
  <li><strong>Position:</strong> x, y on the canvas</li>
  <li><strong>Size:</strong> w, h (resizable in designer)</li>
  <li><strong>Variable:</strong> telemetry channel name to bind to (e.g., "Speed", "Throttle")</li>
  <li><strong>Label:</strong> display name, font size, color, font family</li>
  <li><strong>Value display:</strong> show/hide, font size, color, font family</li>
  <li><strong>Appearance:</strong> border color/width, background color, corner radius, opacity</li>
  <li><strong>Depth:</strong> z-index for layering</li>
  <li><strong>Unit conversion:</strong> signal_scale, signal_offset, conversion preset</li>
</ul>

<h2 id="gauges">Gauges & Meters</h2>

<h3>Gauge (circular dial)</h3>
<p>Classic speedometer-style circular arc gauge with needle. Default size: 130×130.</p>
<ul>
  <li><strong>low, high</strong>: value range (default 0–100)</li>
  <li><strong>precision</strong>: decimal places for value text</li>
  <li><strong>color</strong>: needle color (default green)</li>
  <li>Arc sweep: 240° from bottom-left to bottom-right, 5 major ticks with labels</li>
</ul>

<h3>VBarMeter (vertical bar)</h3>
<p>Vertical fill bar. Ideal for throttle, brake, clutch. Default size: 60×150.</p>
<ul>
  <li><strong>low, high</strong>: value range (default 0–100)</li>
  <li><strong>bar_origin</strong>: "bottom" (fill upward) or "top" (fill downward)</li>
  <li><strong>zero_pin</strong>: draw a reference line at zero when zero is within range</li>
  <li><strong>color_low, color_high</strong>: gradient endpoints (HSV blend, default red→green)</li>
</ul>

<h3>HBarMeter (horizontal bar)</h3>
<p>Same as VBarMeter but horizontal. Default size: 150×40. <code>bar_origin</code> is "left" or "right".</p>

<h2 id="displays">Displays</h2>

<h3>NumericDisplay</h3>
<p>Large numeric readout with label. Default size: 120×60.</p>
<ul>
  <li><strong>precision</strong>: decimal places (default 2)</li>
  <li><strong>display_format</strong>: "decimal" (standard number) or "time" (HH:MM:SS format)</li>
</ul>

<h3>ConditionalDisplay</h3>
<p>Rule-based text + color display. Evaluates rules top-to-bottom, first match wins. Default size: 120×60.</p>
<ul>
  <li><strong>rules</strong>: list of {var, op, threshold, text, color}. Operators: &gt;, &lt;, &gt;=, &lt;=, ==, !=</li>
  <li><strong>default_text, default_color</strong>: fallback if no rule matches</li>
</ul>

<h3>LEDArray</h3>
<p>Multi-LED indicator strip for binary conditions. Default size: 120×30.</p>
<ul>
  <li><strong>leds</strong>: list of LED definitions: {var, op, threshold, color, blink_threshold}</li>
  <li><strong>orientation</strong>: "horizontal" or "vertical"</li>
  <li><strong>blink_rate</strong>: blink speed in ms (default 200) when value exceeds blink_threshold</li>
</ul>

<h2 id="indicators">Indicators</h2>

<h3>SteeringWheel</h3>
<p>Rotating steering wheel image. Default size: 160×160.</p>
<ul>
  <li><strong>wheel_file</strong>: path to wheel PNG/JPG image</li>
  <li><strong>units</strong>: "Degrees" (1× scale), "Radians" (57.3× scale), or "Custom"</li>
  <li><strong>invert</strong>: negate the angle</li>
  <li><strong>rotation_scale</strong>: custom multiplier (when units = Custom)</li>
  <li>Shows degree readout below the wheel</li>
</ul>

<h3>SteeringRatioGauge</h3>
<p>Displays steering ratio deviation from baseline. Default size: 160×140.</p>
<ul>
  <li>Computes: <code>ratio = SteeringWheelAngle × Speed / YawRate</code></li>
  <li><strong>speed_threshold</strong>: collects calibration samples below this speed</li>
  <li>Auto-calibrates baseline from first 50 samples at low speed</li>
  <li>Deviation from baseline indicates understeer (negative) or oversteer (positive)</li>
</ul>

<h3>SlipGauge</h3>
<p>Body slip angle or understeer angle gauge. Default size: 130×130.</p>
<ul>
  <li><strong>mode</strong>: "body_slip" (heading vs velocity vector) or "understeer" (normalized by steering)</li>
  <li><strong>half_range</strong>: display range in degrees (default ±15°)</li>
  <li>Narrow arc gauge with needle</li>
</ul>

<h2 id="specialty">Specialty Elements</h2>

<h3>XYPlot (G-G diagram)</h3>
<p>Embedded mini scatter plot. Default size: 160×160.</p>
<ul>
  <li><strong>var_x, var_y</strong>: two variables to plot against each other</li>
  <li><strong>scale</strong>: plot range (default ±2.0, ideal for G-force)</li>
  <li>Shows outer circle, crosshairs, half-scale ring, and live dot position</li>
  <li>Coordinate text readout at bottom</li>
</ul>

<h3>Minimap</h3>
<p>2D overhead track map with position marker. Default size: 160×160.</p>
<ul>
  <li><strong>mode</strong>: "lapdist" (position from LapDistPct 0–1) or "latlon" (GPS coordinates)</li>
  <li><strong>marker_size</strong>: position dot radius</li>
  <li><strong>trace_color, trace_width</strong>: historical path line</li>
  <li><strong>ribbon_var</strong>: optional variable for color-coded position line (e.g., speed colormap)</li>
  <li><strong>show_corner_labels</strong>: apex/sector markers on track outline</li>
  <li><strong>rotation</strong>: map rotation in degrees</li>
</ul>

<h3>TrackPositionGauge</h3>
<p>Lateral track position + heading angle indicator. Default size: 130×130.</p>
<ul>
  <li>Shows where the car is laterally on the track (inner ↔ outer)</li>
  <li>Shows car heading relative to track tangent</li>
  <li><strong>angle_exaggeration</strong>: visual scaling of heading angle display</li>
</ul>

<h3>SegmentBorder</h3>
<p>Decorative polyline or polygon for organizing layouts. Default size: 100×100.</p>
<ul>
  <li><strong>points</strong>: list of [x, y] coordinates (editable in designer)</li>
  <li><strong>closed</strong>: draw as closed polygon</li>
  <li><strong>line_color, line_width</strong>: border appearance</li>
  <li>No data binding: purely decorative</li>
</ul>
`
},

'dash.designer': {
  section: 'Dashboards',
  tier: 'pro',
  title: 'Dashboard Designer',
  lede: 'The visual editor for creating, editing, and saving dash layouts.',
  prev: ['dash.elements', 'Element Types'],
  next: ['dash.library', 'Dash Library'],
  toc: ['overview', 'workflow', 'controls', 'config', 'saving'],
  tocLabels: ['Overview', 'Workflow', 'Controls', 'Element Configuration', 'Saving'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Dashboard Designer</strong> is a standalone window for visually creating instrument layouts. It provides a canvas where elements can be placed, resized, configured, and arranged freely.</p>

<h2 id="workflow">Workflow</h2>
<ol>
  <li>Open the Dash Designer from <strong>Tools > Dash Library</strong></li>
  <li>Drag elements from the element palette onto the canvas</li>
  <li>Position and resize elements using drag handles</li>
  <li>Double-click an element to open its configuration dialog</li>
  <li>Save the layout to the dash library</li>
</ol>

<h2 id="controls">Controls</h2>
<ul>
  <li><strong>Click + drag:</strong> Move element</li>
  <li><strong>Corner handles:</strong> Resize element</li>
  <li><strong>Double-click:</strong> Open config dialog</li>
  <li><strong>Right-click:</strong> Context menu (delete, duplicate, properties)</li>
  <li><strong>Ctrl+Z / Ctrl+Y:</strong> Undo / Redo</li>
  <li><strong>Delete key:</strong> Remove selected element</li>
  <li><strong>Grid snapping:</strong> Elements snap to grid for alignment</li>
</ul>

<h2 id="config">Element Configuration</h2>
<p>The config dialog (double-click any element) lets you set:</p>
<ul>
  <li><strong>Variable binding:</strong> Which telemetry channel drives this element (with autocomplete)</li>
  <li><strong>Value range:</strong> Low/high for gauges and bars</li>
  <li><strong>Label text:</strong> Display name shown on the element</li>
  <li><strong>Colors:</strong> Element color, gradient endpoints, text color</li>
  <li><strong>Precision:</strong> Decimal places for numeric display</li>
  <li><strong>Unit conversion:</strong> Apply scale/offset or select a conversion preset</li>
</ul>

<h2 id="saving">Saving</h2>
<p>Dashboards are saved as JSON files (DashSpec format) containing the element list with positions, sizes, types, and all parameters. Saved layouts immediately appear in the Dash Library sidebar.</p>
`
},

'dash.library': {
  section: 'Dashboards',
  tier: 'pro',
  title: 'Dash Library',
  lede: 'Browse, load, and manage saved dashboard layouts.',
  prev: ['dash.designer', 'Dashboard Designer'],
  next: ['dash.live-binding', 'Live Binding'],
  toc: ['overview', 'format'],
  tocLabels: ['Overview', 'File Format'],
  body: `
<h2 id="overview">Overview</h2>
<p>The Dash Library is the sidebar in the Dashboard panel. It lists all saved dash layouts. Click a layout to load it onto the canvas. The library auto-refreshes when files are added or modified in the dash library folder.</p>
<p>The library folder path is configurable in <strong>Preferences > File Paths</strong>.</p>

<h2 id="format">File Format (DashSpec)</h2>
<p>Each dashboard layout is stored as a JSON file:</p>
<div class="code-block">
  <div class="ch">
    <div style="display:flex;align-items:center;gap:12px;"><div class="dots"><span></span><span></span><span></span></div><span>example_dash.json</span></div>
    <button class="copy">Copy</button>
  </div>
<pre>{
  <span class="s">"name"</span>: <span class="s">"Race Dashboard"</span>,
  <span class="s">"description"</span>: <span class="s">"Standard race view"</span>,
  <span class="s">"elements"</span>: [
    {
      <span class="s">"type"</span>: <span class="s">"gauge"</span>,
      <span class="s">"x"</span>: <span class="n">20</span>, <span class="s">"y"</span>: <span class="n">20</span>,
      <span class="s">"w"</span>: <span class="n">130</span>, <span class="s">"h"</span>: <span class="n">130</span>,
      <span class="s">"params"</span>: {
        <span class="s">"var"</span>: <span class="s">"Speed"</span>,
        <span class="s">"low"</span>: <span class="n">0</span>, <span class="s">"high"</span>: <span class="n">300</span>,
        <span class="s">"label"</span>: <span class="s">"Speed"</span>
      }
    }
  ]
}</pre>
</div>
<p>Layouts created in the designer use <code>to_dict()</code> for serialization and <code>from_dict()</code> for loading. This makes them easy to version control, share, or edit by hand.</p>
`
},

'dash.live-binding': {
  section: 'Dashboards',
  tier: 'pro',
  title: 'Live Binding',
  lede: 'How dashboards connect to offline cursor data and live iRacing streams.',
  prev: ['dash.library', 'Dash Library'],
  next: ['tools.vehicle-lib', 'Vehicle Library'],
  toc: ['offline', 'live', 'priority', 'refresh'],
  tocLabels: ['Offline Mode', 'Live Mode', 'Branch Priority', 'Refresh Rate'],
  body: `
<h2 id="offline">Offline Mode</h2>
<p>After running a graph (F5), the dashboard enters offline mode. All element values are driven by the 2D plot cursor position:</p>
<ul>
  <li>Moving the cursor interpolates values at that point in time for every bound variable</li>
  <li>The dashboard acts as a virtual instrument panel replaying the recorded session</li>
  <li>Scrubbing the cursor = scrubbing through the data</li>
</ul>

<h2 id="live">Live Mode</h2>
<p>During live streaming (F6), the dashboard switches to live mode:</p>
<ul>
  <li>Values update directly from the iRacing telemetry stream</li>
  <li>No cursor interaction: gauges show real-time values</li>
  <li>Live model predictions (if running) are also available for binding</li>
</ul>

<h2 id="priority">Branch Priority</h2>
<p>When a variable name exists in multiple data branches (e.g., "Speed" in both Raw and Pred), the dashboard resolves the value using a priority list:</p>
<ol>
  <li><strong>Raw</strong>: original telemetry (highest priority)</li>
  <li><strong>Pred</strong>: model predictions</li>
  <li><strong>Val</strong>: validation values</li>
  <li><strong>AuxMath</strong>: computed channels</li>
</ol>
<p>This ensures you see the "real" value by default. To display predictions instead, bind to a variable that only exists in the Pred branch, or adjust priority in settings.</p>

<h2 id="refresh">Refresh Rate</h2>
<p>Dashboard update frequency is configurable: 15, 30, 60, or 120 Hz. Higher rates give smoother gauge animation but use more CPU. 30 Hz is a good balance for most use cases.</p>
`
},

// ─────────────────────────────────────────────────────────────────
// 05: LIBRARIES & TOOLS
// ─────────────────────────────────────────────────────────────────

'tools.vehicle-lib': {
  section: 'Libraries & Tools',
  tier: 'pro',
  title: 'Vehicle Library',
  lede: 'Browse vehicle models in a 3D carousel, set defaults, and configure mesh visualization.',
  prev: ['dash.live-binding', 'Live Binding'],
  next: ['tools.track-lib', 'Track Library'],
  toc: ['overview', 'carousel', 'vehicle-config', 'mesh-classes', 'bundled-vehicles'],
  tocLabels: ['Overview', '3D Carousel', 'Vehicle Configuration', 'Mesh Classes', 'Bundled Vehicles'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Vehicle Library Viewer</strong> (Tools > Libraries > Vehicle Library Viewer) is a 3D carousel interface for browsing and selecting vehicle models. Vehicles are displayed as rotating 3D meshes. The selected vehicle is used as the ghost car model in 3D plot rendering.</p>

<h2 id="carousel">3D Carousel</h2>
<ul>
  <li>Vehicles arranged in a ring layout (adjustable spacing, ~15m default)</li>
  <li><strong>Click</strong> a car to select it</li>
  <li><strong>Drag</strong> to spin the carousel</li>
  <li>Each vehicle has independent yaw tracking (smooth rotation transitions)</li>
  <li><strong>"Set Default"</strong> button saves the current selection to <code>~/.laplabsstudio/config.json</code></li>
</ul>
<p>On app startup, the default vehicle is loaded automatically (fallback to first in library if missing).</p>

<h2 id="vehicle-config">Vehicle Configuration</h2>
<p>Each vehicle is defined by an OBJ mesh file + a JSON configuration:</p>
<ul>
  <li><strong>obj_path</strong>: path to the 3D mesh file (OBJ format with materials)</li>
  <li><strong>length_m</strong>: vehicle length in meters (used for uniform scaling)</li>
  <li><strong>pre_rot_x_deg, pre_rot_y_deg, pre_rot_z_deg</strong>: model-space axis corrections (default: -90° Y for standard conventions)</li>
  <li><strong>mesh_classes</strong>: per-object visual classification (see below)</li>
</ul>
<p>The vehicle library folder path is configurable in Preferences. Add new vehicles by placing an OBJ + JSON pair in this folder.</p>

<h2 id="mesh-classes">Mesh Classes</h2>
<p>Each named object in the OBJ file is assigned to a visual class:</p>
<ul>
  <li><strong>Default</strong>: solid opaque rendering (body panels, wheels)</li>
  <li><strong>Glass</strong>: translucent rendering with tint (windshield, windows). Auto-detected from names containing "glass" or "windshield".</li>
  <li><strong>Hide</strong>: invisible (interior parts you don't want rendered). Auto-detected from names containing "hide".</li>
</ul>
<p>Override automatic classification via the <code>mesh_classes</code> dict in the vehicle JSON config.</p>

<h2 id="bundled-vehicles">Bundled Vehicles</h2>
<p>Studio ships with two generic vehicle models that cover the most common car shapes for ghost-car rendering and dashboard previews:</p>
<ul>
  <li><strong>2026 LLS LMP</strong>: a generic Le Mans prototype body, suited to sportscars and other closed-cockpit road racers.</li>
  <li><strong>2026 LLS Stock</strong>: a generic stock car body, suited to NASCAR-style oval racing.</li>
</ul>
<p>More vehicle models will be added in future releases. Until your specific car is bundled, pick whichever of the two is the closest visual fit, or drop your own OBJ + JSON pair into the vehicle library folder.</p>
`
},

'tools.track-lib': {
  section: 'Libraries & Tools',
  tier: 'pro',
  title: 'Track Library',
  lede: 'Record tracks, manage centerline geometry, sector boundaries, and GPS reference points.',
  prev: ['tools.vehicle-lib', 'Vehicle Library'],
  next: ['tools.scope-builder', 'Scope Builder'],
  toc: ['overview', 'track-data', 'recording', 'auto-matching', 'bundled-tracks'],
  tocLabels: ['Overview', 'Track Data', 'Track Recording', 'Auto-Matching', 'Bundled Tracks'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Track Library</strong> (Tools > Libraries > Track Library) manages track definitions used for 3D visualization, sector timing, and spatial analysis. Each track stores geometry and metadata as a JSON file.</p>

<h2 id="track-data">Track Data</h2>
<p>A track library entry contains:</p>
<ul>
  <li><strong>Centerline XYZ</strong>: Nx3 array of 3D coordinates around the track (used for 3D rendering and LapDistPct → position mapping)</li>
  <li><strong>Sector boundaries</strong>: LapDistPct values where sectors begin/end (for sector timing in the dashboard)</li>
  <li><strong>GPS origin</strong>: (lat, lon, alt) reference point for converting GPS coordinates to local XYZ</li>
  <li><strong>Track mesh</strong>: optional barrier and curb geometry for detailed 3D rendering</li>
  <li><strong>Track ID</strong>: unique identifier for automatic matching</li>
</ul>

<h2 id="recording">Track Recording</h2>
<p>The track recorder captures a new track definition from a live or recorded iRacing session:</p>
<ol>
  <li>Drive a clean lap to establish the centerline (GPS coordinates sampled at 60 Hz)</li>
  <li>The recorder averages multiple laps for a smooth centerline</li>
  <li>Sector boundaries are defined by clicking positions on the resulting map</li>
  <li>Save the track to the library folder</li>
</ol>

<h2 id="auto-matching">Auto-Matching</h2>
<p>When the Load Data node's Track ID is set to <code>__auto__</code>, it uses session metadata (track name from IBT header) to automatically find the matching track in the library. This means you usually only need to record a track once, it's reused for all future sessions at that circuit.</p>

<h2 id="bundled-tracks">Bundled Tracks</h2>
<p>Studio ships with the following tracks pre-installed in the Track Library. Auto-Match recognizes these out of the box; you can also pick them explicitly in any Load Data node.</p>
<ul>
  <li><strong>Autódromo José Carlos Pace</strong> (Interlagos, Grand Prix)</li>
  <li><strong>Bristol Motor Speedway</strong> (Single Pit Road oval)</li>
  <li><strong>Centripetal Circuit</strong> (skidpad)</li>
  <li><strong>Charlotte Motor Speedway</strong> (Oval)</li>
  <li><strong>Circuit de Spa-Francorchamps</strong> (Grand Prix)</li>
  <li><strong>Circuito de Navarra</strong> (Speed Circuit Long)</li>
  <li><strong>Daytona International Speedway</strong> (Road Course)</li>
  <li><strong>Dover Motor Speedway</strong></li>
  <li><strong>Kansas Speedway</strong> (Oval)</li>
  <li><strong>Las Vegas Motor Speedway</strong> (Oval)</li>
  <li><strong>Lime Rock Park</strong> (Grand Prix)</li>
  <li><strong>Michigan International Speedway</strong></li>
  <li><strong>Mount Panorama Circuit</strong> (Bathurst)</li>
  <li><strong>North Wilkesboro Speedway</strong> (Oval)</li>
  <li><strong>Okayama International Circuit</strong> (Full Course)</li>
  <li><strong>Pocono Raceway</strong> (Oval)</li>
  <li><strong>Richmond Raceway</strong></li>
  <li><strong>Road America</strong> (Full Course)</li>
  <li><strong>Silverstone Circuit</strong> (Arena Grand Prix)</li>
  <li><strong>Texas Motor Speedway</strong> (Oval)</li>
  <li><strong>Tsukuba Circuit</strong> (2k Full)</li>
  <li><strong>Watkins Glen</strong> (Boot)</li>
  <li><strong>WeatherTech Raceway Laguna Seca</strong></li>
</ul>
<p>New tracks are added frequently, and the geometric detail of each one (barriers, curbs, elevation accuracy) will continue to improve in future releases. You can also record your own tracks at any time using the Track Recording flow above.</p>
`
},

'tools.scope-builder': {
  section: 'Libraries & Tools',
  tier: 'pro',
  title: 'Scope Builder',
  lede: 'Classify telemetry variables as streaming or event-driven for ML feature engineering.',
  prev: ['tools.track-lib', 'Track Library'],
  next: ['tools.feature-wizard', 'Feature Wizard'],
  toc: ['overview', 'concepts', 'workflow', 'type-inference', 'event-rules'],
  tocLabels: ['Overview', 'Core Concepts', 'Workflow', 'Type Inference', 'Event-Driven Rules'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Scope Builder</strong> (Tools > Libraries > Scope Library) defines which telemetry variables are predictors and which are ground truth for ML workflows. It automatically infers whether each variable is a continuous streaming signal or a discrete event/state, then saves this classification as a scope config JSON.</p>

<h2 id="concepts">Core Concepts</h2>
<p>A <strong>Scope</strong> is a JSON configuration that classifies variables:</p>
<ul>
  <li><strong>Variable key</strong>: lowercase column name</li>
  <li><strong>Display name</strong>: original column name for UI display</li>
  <li><strong>Predictors type</strong>: "Streaming", "Event / State", or "None"</li>
  <li><strong>Truth type</strong>: "Streaming", "Event / State", or "None"</li>
</ul>
<p>This classification drives how the Feature Wizard treats each variable during feature engineering.</p>

<h2 id="workflow">Workflow</h2>
<ol>
  <li>Select a <strong>predictors source</strong> file (CSV or Parquet with raw telemetry)</li>
  <li>Select a <strong>ground truth source</strong> file (may be the same file or a different one)</li>
  <li>Click <strong>Load/Refresh</strong>: type inference runs automatically</li>
  <li>Review the variable table and adjust any incorrect classifications</li>
  <li>(Optional) Add event-driven rules for more nuanced classification</li>
  <li>Click <strong>Save Config JSON</strong>: saves the scope for use in the Feature Wizard</li>
</ol>

<h2 id="type-inference">Type Inference</h2>
<p>The inference algorithm is simple but effective:</p>
<ul>
  <li>Variables with <strong>>6 unique values</strong> → classified as <strong>Streaming</strong> (continuous signal like Speed, Throttle, temperature)</li>
  <li>Variables with <strong>≤6 unique values</strong> → classified as <strong>Event / State</strong> (discrete signal like Gear, PitstopActive, flag status)</li>
</ul>
<p>Inference runs on chunks (100k rows) for memory efficiency. NaN values are treated as equal for comparison.</p>

<h2 id="event-rules">Event-Driven Rules</h2>
<p>Rules refine type classification based on trigger events:</p>
<ul>
  <li><strong>Trigger variable</strong>: which column to watch (e.g., "EnterExitReset")</li>
  <li><strong>Trigger value</strong>: value that fires the rule (e.g., 0 = off-track)</li>
  <li><strong>Type name</strong>: custom label applied to affected variables (e.g., "On Reset")</li>
  <li><strong>Apply to</strong>: "predictors", "ground_truth", or "both"</li>
</ul>
<p>The scanner looks for column changes within ±1 row around trigger events to identify which variables are affected by the event.</p>
`
},

'tools.feature-wizard': {
  section: 'Libraries & Tools',
  tier: 'studio',
  title: 'Feature Wizard',
  lede: 'Two-page wizard for defining feature and target transforms before ML training.',
  prev: ['tools.scope-builder', 'Scope Builder'],
  next: ['tools.extract-templates', 'Extract Templates'],
  toc: ['overview', 'page1', 'page2', 'expressions', 'output'],
  tocLabels: ['Overview', 'Page 1: Selection', 'Page 2: Transforms', 'Expression Syntax', 'Output Format'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Feature Wizard</strong> (Tools > Libraries > User Model Library) is a two-page wizard for defining the complete feature/target engineering pipeline. It takes a scope config (from Scope Builder) and produces a spec JSON that the Model node uses to build training features.</p>

<h2 id="page1">Page 1: Variable Selection</h2>
<p>Load a scope config and select variables:</p>
<ul>
  <li><strong>Predictors table</strong>: all variables classified as predictors. Checkbox to include/exclude each one.</li>
  <li><strong>Ground truth table</strong>: all target variables. Checkbox to include/exclude.</li>
  <li>Tables show: Variable name, Key, Predictors Type, Truth Type</li>
  <li>"Save Selection JSON" exports your choices for re-use across sessions</li>
</ul>

<h2 id="page2">Page 2: Feature & Target Transforms</h2>
<p>Three expression editors define how selected variables are transformed:</p>
<ol>
  <li><strong>Features</strong>: multi-variable transforms for predictors (input to the model)</li>
  <li><strong>Targets</strong>: multi-variable transforms for ground truth (what the model predicts)</li>
  <li><strong>Validation</strong> (optional): raw signals shown alongside smoothed targets for comparison</li>
</ol>

<h2 id="expressions">Expression Syntax</h2>
<h3>Single-Variable Expressions (per row)</h3>
<p>Comma-separated, using <code>x</code> as placeholder for the variable value:</p>
<div class="code-block">
  <div class="ch">
    <div style="display:flex;align-items:center;gap:12px;"><div class="dots"><span></span><span></span><span></span></div><span>Single-var examples</span></div>
  </div>
<pre>x, ema(x, 0.25), cos(2*pi*x), sin(2*pi*x), abs(x)
x, x**2, diff(x)
</pre>
</div>

<h3>Multi-Variable Expressions (one per line)</h3>
<p>Reference any variable with backticks. Optional naming with <code>name = expr</code>:</p>
<div class="code-block">
  <div class="ch">
    <div style="display:flex;align-items:center;gap:12px;"><div class="dots"><span></span><span></span><span></span></div><span>Multi-var examples</span></div>
  </div>
<pre>speed_sq = \`Speed\` ** 2
g_total = sqrt(\`LatAccel\`**2 + \`LongAccel\`**2)
slip_ratio = (\`WheelSpeed_FL\` - \`Speed\`) / \`Speed\`
</pre>
</div>
<p>Derived variables like <code>x_gps</code>, <code>y_gps</code>, <code>z_gps</code> (flat-earth GPS coordinates) are automatically available.</p>

<h2 id="output">Output Format</h2>
<p>The wizard saves a spec JSON containing: source scope path, selected variable keys, single-var expressions per variable, multi-var expression lists, and target/validation definitions. This JSON is loaded by the Model node to build the feature matrix at training time.</p>
`
},

'tools.extract-templates': {
  section: 'Libraries & Tools',
  title: 'Extract Templates',
  lede: 'Pre-defined variable extraction patterns for the Extract Set node.',
  prev: ['tools.feature-wizard', 'Feature Wizard'],
  next: ['tools.relay', 'Live Dash'],
  toc: ['overview', 'builtins', 'custom'],
  tocLabels: ['Overview', 'Built-in Templates', 'Custom Templates'],
  body: `
<h2 id="overview">Overview</h2>
<p><strong>Extract Templates</strong> define which telemetry variables the Extract Set node pulls from raw data. They're presets that save you from manually selecting channels every time.</p>

<h2 id="builtins">Built-in Templates</h2>
<ul>
  <li><strong>dash</strong>: core dashboard variables: Speed, Throttle, Brake, Gear, RPM, SteeringWheelAngle</li>
  <li><strong>tiretemps</strong>: tire temperature channels: inner/middle/outer per corner (12 channels total)</li>
  <li><strong>suspension</strong>: shock deflection, ride height, spring loads per corner</li>
  <li><strong>raw</strong>: all available columns (full extraction, no filtering)</li>
  <li><strong>detailed</strong>: extended physics: tire compounds, setup parameters, fuel, wear</li>
</ul>

<h2 id="custom">Custom Templates</h2>
<p>Create custom templates by specifying a list of column names. Save them as JSON files in the extract templates folder. They'll appear in the Extract Set node's template dropdown alongside the built-ins.</p>
<p>The <strong>Extra Channels</strong> parameter in Extract Set lets you add channels on top of any template without creating a new one.</p>
`
},

'tools.relay': {
  section: 'Libraries & Tools',
  title: 'Live Dash',
  lede: 'Stream live iRacing telemetry to remote viewers at 60 Hz via WebSocket.',
  prev: ['tools.extract-templates', 'Extract Templates'],
  next: ['live.iracing', 'iRacing Integration'],
  toc: ['overview', 'setup', 'standalone-sender', 'data-streamed', 'sharing', 'technical'],
  tocLabels: ['Overview', 'Setup (Studio)', 'Standalone Sender', 'Data Streamed', 'Sharing', 'Technical Details'],
  body: `
<h2 id="overview">Overview</h2>
<p><strong>Live Dash</strong> streams live iRacing data over WebSocket to the LapLabs cloud relay server. Remote viewers watch the session in a web browser dashboard using a 6-digit room code, no software install needed on the viewer side.</p>
<p>There are two ways to send data:</p>
<ul>
  <li><strong>Inside LapLabs Studio</strong>: open the Live Dash sender from the Tools menu</li>
  <li><strong>Standalone Live Dash Sender</strong>: a free, lightweight app that broadcasts telemetry without needing Studio installed</li>
</ul>

<h2 id="setup">Setup (Studio)</h2>
<ol>
  <li>Open the Live Dash dialog from the <strong>Tools</strong> menu</li>
  <li>Start iRacing and enter a session (practice, qualify, or race)</li>
  <li>Click <strong>Connect</strong>: the sender auto-discovers an available room code and begins streaming at 60 Hz</li>
  <li>The room code appears in the dialog header (e.g., "Room: 482917")</li>
</ol>

<div class="callout tip">
  <span class="ic">&#10003;</span>
  <div>
    <span class="lbl">Initial state</span>
    <p>When you first open the dialog, the status reads "Ready. Open iRacing and click Connect to start relaying." Nothing happens until you explicitly click Connect.</p>
  </div>
</div>

<h2 id="standalone-sender">Standalone Sender</h2>
<p>The <strong>Live Dash Sender</strong> is a free standalone app for drivers who only need to broadcast telemetry. It runs without LapLabs Studio and has no dependencies beyond iRacing.</p>
<ol>
  <li>Download the installer from the <a href="products.html#relay">products page</a></li>
  <li>Install and launch Live Dash Sender</li>
  <li>Start iRacing, then click <strong>Connect</strong></li>
  <li>Share your room code with your coach or teammate</li>
</ol>
<p>The standalone sender is identical to the one built into Studio: same data, same 60 Hz rate, same room codes.</p>

<h2 id="data-streamed">Data Streamed</h2>
<p>The sender transmits JSON packets at 60 Hz containing:</p>
<ul>
  <li><strong>Speed</strong>: converted from m/s to MPH</li>
  <li><strong>LapDistPct</strong>: lap progress fraction (0–1)</li>
  <li><strong>Throttle, Brake, Clutch</strong>: normalized 0–1</li>
  <li><strong>Gear</strong>: integer</li>
  <li><strong>SteeringWheelAngle</strong>: radians</li>
  <li><strong>RPM</strong>: engine speed</li>
  <li><strong>OilTemp, WaterTemp</strong>: °C</li>
  <li><strong>FuelLevelPct</strong>: fuel remaining (0–1)</li>
</ul>

<h2 id="sharing">Sharing</h2>
<ul>
  <li><strong>Copy button:</strong> Copies the room code to clipboard (next to the room label)</li>
  <li><strong>Open Dashboard:</strong> Launches browser at <code>laplabs.net/dashboard?room=XXXXXX</code></li>
  <li>Share the room code with anyone: they open the same URL to view</li>
  <li>Multiple viewers can connect simultaneously</li>
</ul>

<h2 id="technical">Technical Details</h2>
<ul>
  <li><strong>Protocol:</strong> WebSocket (wss://)</li>
  <li><strong>Room discovery:</strong> Probes 5 random 6-digit codes in parallel to find an empty room</li>
  <li><strong>Reconnection:</strong> Exponential backoff (1s → 10s max) on disconnection</li>
  <li><strong>Frame size:</strong> Max 8 MB per WebSocket message</li>
  <li><strong>Latency:</strong> Typically < 100ms end-to-end (sender → viewer)</li>
</ul>
`
},

// ─────────────────────────────────────────────────────────────────
// 06: LIVE FEATURES
// ─────────────────────────────────────────────────────────────────

'live.iracing': {
  section: 'Live Features',
  tier: 'pro',
  title: 'iRacing Integration',
  lede: 'How LapLabs connects to iRacing via shared memory for zero-latency telemetry.',
  prev: ['tools.relay', 'Live Dash'],
  next: ['live.data-node', 'Live Data Node'],
  toc: ['overview', 'connection', 'channels', 'requirements'],
  tocLabels: ['Overview', 'Connection Method', 'Available Channels', 'Requirements'],
  body: `
<h2 id="overview">Overview</h2>
<p>LapLabs Studio connects to iRacing using the <strong>iRSDK</strong> (iRacing SDK) Python bindings. Data is read directly from iRacing's shared memory at 60 Hz, no file I/O, no UDP configuration, no network latency. This provides the fastest possible access to live telemetry.</p>

<h2 id="connection">Connection Method</h2>
<ul>
  <li><strong>Transport:</strong> Windows shared memory (memory-mapped file)</li>
  <li><strong>Polling rate:</strong> ~1000 Hz internal polling (deduplicates on SimTick changes)</li>
  <li><strong>Output rate:</strong> 60 Hz (one sample per sim tick advance)</li>
  <li><strong>Latency:</strong> < 1ms from sim to LapLabs</li>
</ul>
<p>The Live Data node's internal worker (<code>IRSDKWorker</code>) runs in a dedicated QThread. It polls iRSDK at high frequency and only emits a new sample when the simulation tick advances, ensuring clean 60 Hz output.</p>

<h2 id="channels">Available Channels</h2>
<p>iRacing exposes all session variables via iRSDK. Common channels include:</p>
<ul>
  <li><strong>Motion:</strong> Speed, VelocityX/Y/Z, Yaw, Pitch, Roll, LatAccel, LongAccel, VertAccel</li>
  <li><strong>Inputs:</strong> Throttle, Brake, Clutch, SteeringWheelAngle, Gear</li>
  <li><strong>Engine:</strong> RPM, OilTemp, WaterTemp, FuelLevel, FuelLevelPct, FuelUsePerHour</li>
  <li><strong>Tires:</strong> LF/RF/LR/RR pressure, temp (inner/middle/outer), wear, speed</li>
  <li><strong>Suspension:</strong> LF/RF/LR/RR shock deflection, ride height</li>
  <li><strong>Session:</strong> SessionTime, LapDistPct, Lap, LapLastLapTime, PlayerTrackSurface</li>
</ul>
<p>The full channel list is determined dynamically from the iRSDK header at session start.</p>

<h2 id="requirements">Requirements</h2>
<ul>
  <li>iRacing must be running on the <strong>same machine</strong> as LapLabs (shared memory doesn't cross network boundaries)</li>
  <li>The <code>pyirsdk</code> Python package must be installed (bundled in the standalone build)</li>
  <li>iRacing must be in an active session: garage/menu screens don't produce telemetry</li>
  <li>LapLabs and iRacing must run as the same user (or both elevated)</li>
</ul>
`
},

'live.data-node': {
  section: 'Live Features',
  tier: 'pro',
  title: 'Live Data Node',
  lede: 'The source node for real-time iRacing telemetry in live graphs.',
  prev: ['live.iracing', 'iRacing Integration'],
  next: ['live.recorder', 'Live Recorder'],
  toc: ['overview', 'params', 'stream-output', 'usage'],
  tocLabels: ['Overview', 'Parameters', 'Stream Output', 'Usage'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Data</strong> node (LiveIRSDKNode) is the entry point for live telemetry. It connects to iRacing via iRSDK and emits a 60 Hz sample stream to downstream live nodes.</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> None</li>
  <li><strong>Output:</strong> <code>LiveOut</code> (stream type)</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Vars</strong>: comma-separated list of iRacing channel names to extract. Leave blank to capture all available channels. Example: <code>Speed,Throttle,Brake,SteeringWheelAngle,RPM</code></li>
</ul>
<p>Filtering variables reduces memory usage and speeds up downstream processing when you only need specific channels.</p>

<h2 id="stream-output">Stream Output</h2>
<p>Each emitted sample is a tuple: <code>(session_time, data_dict, tick)</code></p>
<ul>
  <li><strong>session_time</strong>: float, seconds since session start</li>
  <li><strong>data_dict</strong>: dict of {channel_name: value} for all captured vars</li>
  <li><strong>tick</strong>: integer sim tick counter (monotonically increasing at 60 Hz)</li>
</ul>

<h2 id="usage">Usage</h2>
<p>Place a Live Data node at the start of your live graph. Connect it to downstream nodes:</p>
<ul>
  <li><strong>Live Data → Live Model → Live Output</strong>: real-time inference pipeline</li>
  <li><strong>Live Data → Live Recorder</strong>: record session to Parquet</li>
  <li><strong>Live Data → Live Pass-Through → Live Output</strong>: view raw data without a model</li>
</ul>
<p>Press <strong>F6</strong> to start the live graph. The node waits for iRacing, then begins streaming automatically. Press <strong>F12</strong> to stop.</p>
`
},

'live.recorder': {
  section: 'Live Features',
  tier: 'pro',
  title: 'Live Recorder',
  lede: 'Capture live sessions to Parquet files for later offline analysis.',
  prev: ['live.data-node', 'Live Data Node'],
  next: ['live.model', 'Live Model & Inference'],
  toc: ['overview', 'params', 'output-format', 'gap-filling'],
  tocLabels: ['Overview', 'Parameters', 'Output Format', 'Gap Filling'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Recorder</strong> node buffers streaming telemetry in memory and writes a Parquet file when the session ends. The saved file is directly compatible with the Load Data node for offline analysis.</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> <code>LiveIn</code> (stream type)</li>
  <li><strong>Output:</strong> None (writes file to disk)</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Output Directory</strong>: where to save recordings (default: <code>~/.laplabsstudio/LiveRecordings</code>)</li>
  <li><strong>File Prefix</strong>: filename prefix (default: "live_recording"). Output: <code>{prefix}_{YYYYMMDD_HHMMSS}.parquet</code></li>
  <li><strong>Compression</strong>: Parquet compression codec: zstd (default), snappy, gzip, brotli, or none</li>
  <li><strong>Dtype</strong>: value precision: float32 (smaller files) or float64 (full precision)</li>
  <li><strong>Include Tick</strong>: store the Tick column (default: yes)</li>
  <li><strong>Include Session Time</strong>: store the SessionTime column (default: yes)</li>
  <li><strong>Record Keys</strong>: allowlist of channels to record (blank = all)</li>
  <li><strong>Exclude Keys</strong>: blocklist of channels to skip</li>
  <li><strong>Fill Missing Ticks</strong>: interpolate gaps when ticks are skipped (default: yes)</li>
  <li><strong>Auto Arm</strong>: start recording automatically on first sample</li>
</ul>

<h2 id="output-format">Output Format</h2>
<p>A single Parquet file with columns: SessionTime, Tick, and all recorded telemetry channels. Numeric columns are coerced to the selected dtype. This file loads directly in the Load Data node as if it were a converted IBT.</p>

<h2 id="gap-filling">Gap Filling</h2>
<p>If the sim tick jumps by more than 1 (e.g., momentary freeze or alt-tab), the recorder can interpolate the missing samples. This produces smooth, gap-free recordings that downstream analysis won't choke on. Disable if you want exact raw samples only.</p>
`
},

'live.model': {
  section: 'Live Features',
  tier: 'studio',
  title: 'Live Model & Inference',
  lede: 'Run trained neural networks on live telemetry with rolling buffer and denormalization.',
  prev: ['live.recorder', 'Live Recorder'],
  next: ['live.filter', 'Live Filter'],
  toc: ['overview', 'params', 'pipeline', 'workflow', 'output'],
  tocLabels: ['Overview', 'Parameters', 'Real-Time Pipeline', 'Setup Workflow', 'Output Format'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Model</strong> node loads a saved model bundle (.pt file) and runs inference on each incoming telemetry sample in real-time. It supports all model architectures: Linear, MLP, GRU, TCN, and Transformer.</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> <code>LiveIn</code> (stream type)</li>
  <li><strong>Output:</strong> <code>LiveOut</code> (model_stream type)</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Model File</strong>: path to saved model bundle (.pt). Contains weights, architecture params, normalization stats.</li>
  <li><strong>Device Mode</strong>: "auto" (use GPU if available), "cpu", or "cuda"</li>
  <li><strong>Buffer Samples</strong>: rolling buffer size (default 60 ≈ 1 second at 60 Hz). Needed for sequence models (GRU/TCN/Transformer) that require history.</li>
  <li><strong>Aux Cols</strong>: comma-separated auxiliary columns to pass through to downstream nodes</li>
</ul>

<h2 id="pipeline">Real-Time Pipeline</h2>
<p>For each new incoming sample:</p>
<ol>
  <li>Raw iRSDK values are buffered in a rolling FIFO deque</li>
  <li>Feature vector X is built using the same feature construction as offline training</li>
  <li>For sequence models: X history is maintained (length = hist_len)</li>
  <li>Inference runs: linear matrix multiply or torch forward pass</li>
  <li>Predictions are denormalized using saved y_mean/y_std from the model bundle</li>
  <li>Output is emitted with raw values, features, and predictions</li>
</ol>
<p><strong>Backpressure:</strong> If feature-building or inference lags behind the 60 Hz input, intermediate ticks are dropped (latest-only mode). This ensures the display always shows the most recent prediction.</p>

<h2 id="workflow">Setup Workflow</h2>
<ol>
  <li>Train a model offline (Model node) and save to the registry</li>
  <li>Add a Live Model node to your live graph</li>
  <li>Select the saved model file</li>
  <li>Connect: <strong>Live Data → Live Model → Live Output</strong></li>
  <li>Press F6 to start live inference</li>
</ol>

<h2 id="output">Output Format</h2>
<p>Each output sample (model_stream) contains:</p>
<ul>
  <li><code>raw</code>: dict of raw iRSDK values at this tick</li>
  <li><code>X</code>: feature vector (NumPy array)</li>
  <li><code>pred</code>: prediction vector (NumPy array, denormalized)</li>
  <li><code>mode</code>: model mode string (e.g., "dpos")</li>
  <li><code>Y_names</code>: list of prediction output names</li>
</ul>
`
},

'live.filter': {
  section: 'Live Features',
  tier: 'pro',
  title: 'Live Filter',
  lede: 'Apply real-time incremental smoothing to predictions or raw channels.',
  prev: ['live.model', 'Live Model & Inference'],
  next: ['live.auxmath', 'Live Aux Math'],
  toc: ['overview', 'methods', 'state', 'recommendations'],
  tocLabels: ['Overview', 'Methods', 'Stateful Processing', 'Recommendations'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Filter</strong> node applies incremental smoothing filters to live model_stream data. Unlike the offline Filter node which processes entire arrays, this node processes one sample at a time, maintaining internal state across ticks.</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> <code>LiveIn</code> (model_stream)</li>
  <li><strong>Output:</strong> <code>LiveOut</code> (model_stream, filtered)</li>
</ul>

<h2 id="methods">Methods</h2>
<p>Same methods as the offline Filter node, adapted for sample-by-sample operation:</p>
<ul>
  <li><strong>EMA</strong>: exponential moving average. Params: tau (time constant), dt (1/60)</li>
  <li><strong>One Euro</strong>: adaptive cutoff. Params: min_cutoff, beta, d_cutoff</li>
  <li><strong>Butterworth</strong>: IIR low-pass. Params: order, cutoff_hz</li>
  <li><strong>MA</strong>: moving average (keeps internal buffer of last N samples)</li>
  <li><strong>Median</strong>: median of rolling window</li>
  <li><strong>Integrate</strong>: running cumulative trapezoidal sum</li>
  <li><strong>Differentiate</strong>: finite difference from previous sample</li>
</ul>

<h2 id="state">Stateful Processing</h2>
<p>The Live Filter maintains a per-channel state dictionary (<code>_states</code>). This stores:</p>
<ul>
  <li>Previous output value (for EMA, Butterworth)</li>
  <li>Rolling buffer (for MA, Median)</li>
  <li>Derivative estimate (for One Euro)</li>
  <li>Cumulative sum (for Integrate)</li>
</ul>
<p>State resets when the live graph restarts (F6). Backpressure handling: drops intermediate ticks to stay real-time.</p>

<h2 id="recommendations">Recommendations</h2>
<ul>
  <li><strong>For minimal latency:</strong> Use EMA (tau = 0.05–0.2s) or One Euro (min_cutoff = 1–5 Hz, beta = 0.01)</li>
  <li><strong>For spike removal:</strong> Use Median with small window (3–5 samples)</li>
  <li><strong>Avoid centered filters</strong> in live mode, they introduce delay equal to half the window</li>
  <li><strong>Butterworth</strong> is good for sharp cutoff needs but adds phase lag proportional to order</li>
</ul>
`
},

'live.auxmath': {
  section: 'Live Features',
  tier: 'pro',
  title: 'Live Aux Math',
  lede: 'Point-wise custom math expressions on live model_stream data.',
  prev: ['live.filter', 'Live Filter'],
  next: ['live.output', 'Live Output'],
  toc: ['overview', 'syntax', 'variables', 'limitations'],
  tocLabels: ['Overview', 'Syntax', 'Available Variables', 'Limitations'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Aux Math</strong> node applies custom point-wise math expressions to each incoming model_stream sample. Use it to compute derived channels in real-time (e.g., total G-force, slip angles, custom indicators).</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> <code>LiveIn</code> (model_stream)</li>
  <li><strong>Output:</strong> <code>LiveOut</code> (model_stream with added aux channels)</li>
</ul>

<h2 id="syntax">Syntax</h2>
<p>Same backtick expression syntax as the offline Aux Math node:</p>
<div class="code-block">
  <div class="ch">
    <div style="display:flex;align-items:center;gap:12px;"><div class="dots"><span></span><span></span><span></span></div><span>Live Aux Math</span></div>
    <button class="copy">Copy</button>
  </div>
<pre><span class="c"># Compute total G-force from raw iRSDK channels</span>
<span class="k">@total_g</span> = sqrt(<span class="s">\`LatAccel\`</span>**2 + <span class="s">\`LongAccel\`</span>**2)

<span class="c"># Speed in km/h (iRSDK gives m/s)</span>
<span class="k">@speed_kph</span> = <span class="s">\`Speed\`</span> * <span class="n">3.6</span>

<span class="c"># Use model predictions</span>
<span class="k">@pred_error</span> = pred[<span class="n">0</span>] - <span class="s">\`Speed\`</span>
</pre>
</div>

<h2 id="variables">Available Variables</h2>
<p>In addition to raw iRSDK channels (via backticks), live expressions can access:</p>
<ul>
  <li><code>pred</code>: model prediction vector (NumPy array). Access elements with <code>pred[0]</code>, <code>pred[1]</code>, etc.</li>
  <li><code>X</code>: feature vector (NumPy array)</li>
  <li><code>t</code>: current session time (float, seconds)</li>
  <li>NumPy functions: sqrt, sin, cos, abs, clip, min, max, etc.</li>
</ul>

<h2 id="limitations">Limitations</h2>
<ul>
  <li><strong>Point-wise only</strong>: no history access. Rolling helpers (rolling_mean, rolling_max) are NOT available in live mode. Use the Live Filter node for smoothing.</li>
  <li><strong>No inter-sample state</strong>: each expression evaluates independently per tick</li>
  <li>Expressions are compiled once at graph start for performance</li>
</ul>
`
},

'live.output': {
  section: 'Live Features',
  tier: 'pro',
  title: 'Live Output',
  lede: 'Real-time rolling plots of live telemetry and model predictions.',
  prev: ['live.auxmath', 'Live Aux Math'],
  next: ['live.relay', 'Live Dash Viewer'],
  toc: ['overview', 'params', 'display'],
  tocLabels: ['Overview', 'Parameters', 'Display'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Live Output</strong> node displays live data as rolling time-series plots. A sliding window shows the most recent N seconds, scrolling continuously. Both raw telemetry and model predictions are displayed simultaneously.</p>
<ul>
  <li><strong>Category:</strong> Live</li>
  <li><strong>Input:</strong> <code>LiveIn</code> (model_stream)</li>
  <li><strong>Output:</strong> None (creates plot window)</li>
</ul>

<h2 id="params">Parameters</h2>
<ul>
  <li><strong>Window Seconds</strong>: rolling window duration (default 10 seconds, showing ~600 samples)</li>
  <li><strong>Redraw Hz</strong>: plot refresh rate (default 20 Hz). Higher = smoother but more CPU.</li>
  <li><strong>Auto Open</strong>: automatically open the plot window when F6 is pressed</li>
</ul>

<h2 id="display">Display</h2>
<p>The live plot window shows:</p>
<ul>
  <li><strong>Raw channels</strong>: direct iRSDK values as colored lines</li>
  <li><strong>Predictions</strong>: model output overlaid (if using Live Model upstream)</li>
  <li><strong>Aux channels</strong>: computed values from Live Aux Math</li>
</ul>
<p>The dashboard panel also updates in real-time during live mode, displaying gauge values from the latest sample.</p>
`
},

'live.relay': {
  section: 'Live Features',
  title: 'Live Dash Viewer',
  lede: 'Watch a live iRacing session remotely in your browser via Live Dash.',
  prev: ['live.output', 'Live Output'],
  next: ['guide.corner-modes', 'Corner Modes: Find What to Investigate'],
  toc: ['overview', 'viewer-features'],
  tocLabels: ['Overview', 'Web Viewer Features'],
  body: `
<h2 id="overview">Overview</h2>
<p>The Live Dash viewer lets anyone with a room code watch a live iRacing session in a web browser. No software install needed. The driver runs the <a href="docs-article.html?page=tools.relay">Live Dash sender</a> (built into Studio or the free standalone app) to broadcast telemetry.</p>

<h2 id="viewer-features">Web Viewer Features</h2>
<p>The web dashboard at <code>laplabs.net/dashboard?room=XXXXXX</code> displays:</p>
<ul>
  <li><strong>Real-time charts:</strong> Speed, throttle, brake traces scrolling at 60 Hz</li>
  <li><strong>Gauges:</strong> Circular speed gauge, RPM gauge, gear indicator</li>
  <li><strong>Steering wheel:</strong> Animated rotation matching driver input</li>
  <li><strong>Pedal bars:</strong> Throttle and brake position bars</li>
  <li><strong>Engine temps:</strong> Oil and water temperature readouts</li>
  <li><strong>Fuel level:</strong> Remaining fuel percentage</li>
</ul>
<p>Multiple viewers can connect to the same room simultaneously. The viewer auto-reconnects if the connection drops.</p>
`
},

// ─────────────────────────────────────────────────────────────────
// 07: WORKFLOWS & GUIDES
// ─────────────────────────────────────────────────────────────────

'guide.corner-modes': {
  section: 'Workflows & Guides',
  tier: 'pro',
  title: 'Corner Modes: Find What to Investigate',
  lede: "The atlas for telemetry analysis: cluster a corner's passes into driving modes, see what makes each mode different, then drill in with the tools you already know.",
  prev: ['live.relay', 'Live Dash Viewer'],
  next: ['guide.training', 'Building a Training Graph'],
  toc: [
    'atlas',
    'open-and-pick',
    'reading-cards',
    'drill-view',
    'canonical-workflow',
    'going-deeper',
  ],
  tocLabels: [
    'The Atlas Concept',
    'Open a Set, Pick a Corner',
    'Reading the Mode Cards',
    'The Drill-In View',
    'The Canonical Workflow',
    'Going Deeper',
  ],
  body: `
<h2 id="atlas">The Atlas Concept</h2>
<p>The <strong>Corner Modes</strong> panel (right column, below the Scatter panel) clusters every flying pass through a chosen corner into a handful of distinct driving <em>modes</em>: coherent groups of laps that were driven the same way. Each mode is a card with a color, a sector-time delta vs the population average, a list of post-hoc tags ("Lower min Speed", "Later release Brake", …) and a per-stint distribution bar.</p>
<p>It's deliberately a <strong>pointer, not a source of truth</strong>. The panel tells you <em>where to look</em>; the actual investigation happens in the tools you already use, synced 2D and 3D plots, the dashboard, the scatter panel. Think of it as the atlas for your session: it shows you the territory and which regions are worth visiting, then you grab the field tools to dig in.</p>
<div class="callout note">
  <span class="ic">i</span>
  <div>
    <span class="lbl">Why an atlas</span>
    <p>A session with 80 laps doesn't have 80 different driving styles. It has maybe 3–5 distinct ones, repeated. Pulling them apart turns a wall of nearly-identical traces into "here are your three approaches, here's the delta between them, here's the lap that exemplifies each." That's where coaching and setup conversations actually start.</p>
  </div>
</div>

<h2 id="open-and-pick">Open a Set, Pick a Corner</h2>
<ol>
  <li><strong>Run a workflow first.</strong> Corner Modes works off the most-recent run in the Run Store, load IBT data, execute the graph, then look right. Multi-segment sets (multiple stints in one set) are fully supported.</li>
  <li><strong>Pick a corner</strong> from the dropdown at the top. Corners are auto-detected from the dash's track outline; a re-detection runs whenever a new track is loaded. You can also add <strong>★ Custom</strong> entries with arbitrary LapDistPct bounds, useful for complex chicanes, or for slicing a long section like Maggotts–Becketts.</li>
  <li>Analysis fires automatically on every change. There's no Analyze button. Change the corner, K, dim, channels, label rules, or the source run and the cards re-cluster immediately. Results are disk-cached per (track, corner, settings).</li>
</ol>
<p>The <strong>Options ▾</strong> menu groups the rest of the controls:</p>
<ul>
  <li><strong>K</strong>: target number of modes. Higher = finer splits; lower = broader groups. The actual K may be lower than requested when there's not enough data.</li>
  <li><strong>Dim</strong>: PCA components used for clustering (default 8). Mostly leave alone unless modes look unstable on small data.</li>
  <li><strong>Channels…</strong>: which telemetry channels feed the clustering. Speed / Brake / Throttle / Steering by default; you can add any Raw or AuxMath channel.</li>
  <li><strong>Labels…</strong>: edit the auto-tag rule set. Each rule reduces a channel to a scalar (mean, peak, min, first-cross, last-cross, range, etc.); modes whose scalar lands far from the population mean get tagged.</li>
  <li><strong>Fit-score matrix…</strong> / <strong>Scalar correlation matrix…</strong>: see "Going Deeper" below.</li>
  <li><strong>+ all (replace ghosts)</strong>: clears existing ghosts and adds the top-N most-representative pass of each mode as a ghost. The N per mode comes from each card's spinbox.</li>
  <li><strong>Sync to corner</strong>: sets the ghost sync point + playback range to the current corner's span and seeks the playhead there. Pairs with the next bullet.</li>
  <li><strong>Auto</strong>: when checked, every successful analysis automatically runs "+ all" and "Sync". Lets you scrub through corners and watch the ghosts repaint themselves without clicking anything.</li>
</ul>

<h2 id="reading-cards">Reading the Mode Cards</h2>
<p>Each card is a one-glance summary. Top row:</p>
<ul>
  <li><strong>Color swatch</strong>: click to recolor. The color carries through to every ghost added from this mode, so ghosts from one mode visually group in playback.</li>
  <li><strong>Mode N</strong> + percent + <strong>Δs</strong>: share of the corner's passes in this mode, plus the average corner-time delta vs the population. Green = faster, orange = slower.</li>
  <li><strong>spinbox + ＋</strong>: add the top-N most-representative passes of this mode as ghosts.</li>
  <li><strong>▶</strong>: play the canonical (most-representative) pass.</li>
  <li><strong>✕</strong>: exclude every pass in this mode and re-cluster the rest. Use to weed out in/out laps, spins, and outlier groups; reset via the status-line link.</li>
  <li><strong>›</strong>: open the drill-in view (next section).</li>
</ul>
<p>Stats line:</p>
<ul>
  <li><strong>σ</strong>: within-mode std-dev of corner duration. Lower = more repeatable driving (the strong coaching signal, consistency often matters more than peak speed).</li>
  <li><strong>stint Lx–Ly</strong>: which laps within the segment this mode tends to occur in (early stint vs late stint).</li>
  <li><strong>± ml</strong>: fuel-per-corner delta vs the population (visible when the difference is meaningful).</li>
</ul>
<p>Below the stats: a thin <strong>segment-distribution bar</strong> shows what fraction of the mode's passes came from each stint (S1 / S2 / …) when multiple segments exist. A mode dominated by one stint is a strong hint that the cause is between-stint, setup, tires, weather, driver fatigue. Above the bar: the panel header carries a <code>seg η²=…</code> chip showing the same effect at the whole-corner level.</p>
<p>The <strong>auto-tags</strong> at the bottom of the card are the post-hoc explanation: "Higher entry Speed", "Later release Brake", "Wider range Steering", and so on. Each tag means the mode's mean scalar for that rule is at least 0.4 standard deviations from the population mean. Hover for the z-scores.</p>

<h2 id="drill-view">The Drill-In View</h2>
<p>Click <strong>›</strong> on any card (or anywhere on the card's open arrow) to open the drill view. Three panes, all draggable via the splitter handles:</p>
<ul>
  <li><strong>Channel-trace chart</strong> (top): per-channel mean trace for this mode (green) overlaid on the population mean (gray dashed). One sub-plot per channel; x-axes are linked. Lets you see <em>where in the corner</em> the mode differs from the population, earlier brake release, mid-corner throttle dip, exit-phase steering correction.</li>
  <li><strong>Representation scatter</strong> (middle): every member of the mode plotted as a colored dot at (x = scalar, y = distance-to-centroid in PCA space). Lower y = more typical of the mode; higher y = an outlier within the mode.
    <ul>
      <li>The <strong>x-axis dropdown</strong> switches the scalar: <em>Section</em> (corner-slice duration), <em>Sector</em> (containing iRacing sector time), <em>Lap</em> (full lap time), then every label rule, pick "min Speed" to see how min-speed distributes within this mode, "release Brake" for release-frac distribution, etc. Each entry carries an <code>(r=0.NN)</code> fit-score (multi-R of the scalar against within-mode coords) so you can see at a glance which scalar best explains the mode's spread. The dashed best-fit line is colored by that score: red = noisy fit, green = clean linear relationship.</li>
      <li><strong>Left-click a dot</strong> to toggle that pass as a ghost. A yellow ring marks every dot that's currently an active ghost across any open plot, same gesture in reverse to remove.</li>
      <li><strong>Left-drag</strong> to draw a rectangle. On release, every point inside toggles: if any are already active ghosts, the active ones get removed; otherwise all points in the box get added. Lasso-add and lasso-deselect with one gesture.</li>
      <li><strong>Right-click</strong> any dot for a context menu (Play / Add or Remove ghost).</li>
    </ul>
  </li>
  <li><strong>Member list</strong> (bottom): every pass in the mode by segment + lap, with its full lap time. Double-click to seek the playhead; right-click for the same Play / Add-as-ghost menu.</li>
</ul>

<h2 id="canonical-workflow">The Canonical Workflow</h2>
<p>This is the recommended flow for any post-session review:</p>
<ol>
  <li><strong>Open your IBT files</strong> and run the standard workflow. (See <a href="docs-article.html?page=gs.first-workflow">Your First Workflow</a>.)</li>
  <li><strong>Open Corner Modes</strong> on the right. Pick a corner you want to understand, start with one where lap-time spread is large.</li>
  <li><strong>Read the cards.</strong> The shape of the modes tells the first story:
    <ul>
      <li><em>One dominant mode</em> (e.g. 80% of laps) and one or two stragglers → you're driving this corner consistently; the stragglers are usually outliers worth checking but not coaching signal.</li>
      <li><em>Two or three roughly balanced modes</em> with meaningfully different Δs → you have multiple approaches competing; the tags tell you what they differ on.</li>
      <li><em>Stint-purity in the segment bar</em> → the cause is between-stint (setup, tires, conditions, fatigue).</li>
      <li><em>Time spread within a mode is small but Δ is non-zero</em> → that mode's a repeatable but not optimal approach; the gap to the fast mode is your coaching margin.</li>
    </ul>
  </li>
  <li><strong>"+ all" + "Sync"</strong> (or turn on <strong>Auto</strong>) to drop the top-N pass of every mode into 3D playback. The panel handles the color grouping so each mode reads as one family.</li>
  <li><strong>Open a 2D plot</strong> alongside (waterfall, normal traces, whatever's set up). The same ghosts appear there; the cursor stays synced. Look at <strong>Brake</strong>, <strong>Throttle</strong>, <strong>Steering</strong>, <strong>Speed</strong> traces lap-by-lap. The mode tags pointed you at what to look at, now confirm with the actual trace shape.</li>
  <li><strong>Use the dashboard</strong> for a high-level instrument readout, or the <strong>scatter panel</strong> (G-G-V, pedal trace, handling envelope) to triangulate the same finding from a different angle.</li>
  <li><strong>Drill into individual outliers.</strong> In the drill-in scatter, dots far from the cluster centroid are passes that didn't quite fit the mode. Click them as ghosts and compare, they're often the most instructive (a brake release that happened 0.3 s earlier than the rest of the mode, a slightly different line through the apex).</li>
  <li><strong>Form a recommendation.</strong> A coaching call ("delay your brake release") or a setup change ("the front wing's pushing under load, try one tick less"). The atlas got you to the right corner of the map; the synced plots prove the hypothesis; the recommendation is yours.</li>
</ol>
<div class="callout tip">
  <span class="ic">&#10003;</span>
  <div>
    <span class="lbl">Tip</span>
    <p>The Auto checkbox makes corner-hopping nearly free. Set up your 3D + 2D plots once, toggle Auto on, then just change the corner dropdown: ghosts repaint, sync point + range jump to the new corner, and you're looking at it.</p>
  </div>
</div>

<h2 id="going-deeper">Going Deeper</h2>
<p>Two analysis dialogs in the <strong>Options ▾</strong> menu help when the per-mode tags don't quite explain what's happening:</p>
<ul>
  <li><strong>Fit-score matrix</strong>: a rule × mode heatmap. Rows are the time options plus every label rule; columns are the modes plus an <strong>All</strong> column (population-level fit). Each cell is a multi-R fit score: how much of the within-mode spread is explained by that scalar. Sorted by max-across-modes so the most-explanatory scalars float to the top. Click any mode cell to drill into that mode with the cell's x-axis already selected.
    <ul>
      <li>High in <strong>All</strong> AND high in some mode column → the scalar discriminates modes.</li>
      <li>Low in <strong>All</strong> but high in one mode column → that scalar captures within-mode nuance the cluster boundary missed.</li>
    </ul>
  </li>
  <li><strong>Scalar correlation matrix</strong>: a |Pearson r| heatmap between every scalar pair. Column headers run diagonally so wordy labels fit. The <strong>Subset</strong> dropdown switches between All passes and per-mode views; the heatmap tints in the mode's swatch color (red for All) for visual association. Click any off-diagonal cell to open a paired scatter + linear best-fit line for that pair. Useful for spotting redundant rules (two rules with |r| ≈ 1 measure the same thing, candidates for pruning) and for surfacing relationships that only exist within a driving style.</li>
</ul>
<p>And one panel-level signal that doesn't need a dialog: the <code>seg η²=…</code> chip in the status line is the fraction of variation in how this corner is driven that's between-stint vs within-stint. Green at ≥ 0.15, different stints are driving this corner notably differently. Gray near zero, stint doesn't matter much for this corner.</p>
`
},

'guide.training': {
  section: 'Workflows & Guides',
  tier: 'studio',
  title: 'Building a Training Graph',
  lede: 'End-to-end guide for training a neural network on telemetry data.',
  prev: ['guide.corner-modes', 'Corner Modes: Find What to Investigate'],
  next: ['guide.live-inference', 'Live Inference Setup'],
  toc: ['overview', 'graph', 'training', 'evaluation'],
  tocLabels: ['Overview', 'Graph Setup', 'Training', 'Evaluation'],
  body: `
<h2 id="overview">Overview</h2>
<p>A typical training workflow: Load Data → Model → Output. The Model node trains on the training split and evaluates on the test split, then the Output node visualizes predictions vs ground truth.</p>

<h2 id="graph">Graph Setup</h2>
<ol>
  <li>Add a <strong>Load Data</strong> node. Point it at your IBT folder, select a stint, and set the train/test split.</li>
  <li>Add a <strong>Model</strong> node. Connect Load Data → Model.</li>
  <li>Configure the Model: choose architecture (MLP is a good start), set hidden width, layers, epochs.</li>
  <li>Add an <strong>Output</strong> node. Connect Model → Output.</li>
</ol>

<h2 id="training">Training</h2>
<p>Press F5 to run. The Model node trains on TrainData and runs inference on both splits. Training loss is logged to the console. The model can be saved to the registry for live use.</p>

<h2 id="evaluation">Evaluation</h2>
<p>The Output node shows predictions (Pred branch) overlaid with raw data (Raw branch) on the 2D plot. Use the legend to compare channels. The 3D plot shows the predicted driving line vs actual.</p>
<p>Use the <strong>Run Store</strong> (bottom-left panel) to save and compare multiple training runs with different hyperparameters.</p>
`
},

'guide.live-inference': {
  section: 'Workflows & Guides',
  tier: 'studio',
  title: 'Live Inference Setup',
  lede: 'Run your trained model on live iRacing data.',
  prev: ['guide.training', 'Building a Training Graph'],
  next: ['guide.model-compare', 'Model Comparison'],
  toc: ['overview', 'steps'],
  tocLabels: ['Overview', 'Steps'],
  body: `
<h2 id="overview">Overview</h2>
<p>Once you've trained a model offline, you can run it in real-time on live iRacing telemetry. The live graph streams data from iRSDK, builds features, runs inference, and displays results.</p>

<h2 id="steps">Steps</h2>
<ol>
  <li>Train a model offline and save it to the model registry</li>
  <li>Create a new graph with: <strong>Live Data → Live Model → Live Output</strong></li>
  <li>In the Live Model node, select your saved model from the registry</li>
  <li>Optionally add <strong>Live Filter</strong> or <strong>Live Aux Math</strong> nodes between Live Model and Live Output</li>
  <li>Start iRacing and enter a session</li>
  <li>Press <strong>F6</strong> to start the live graph</li>
  <li>The Live Output plot shows predictions updating in real-time</li>
</ol>

<div class="callout tip">
  <span class="ic">&#10003;</span>
  <div>
    <span class="lbl">Tip</span>
    <p>Add a <strong>Live Recorder</strong> node to capture the live session for later offline analysis.</p>
  </div>
</div>
`
},

'guide.model-compare': {
  section: 'Workflows & Guides',
  tier: 'studio',
  title: 'Model Comparison',
  lede: 'Compare multiple training runs using the Run Store.',
  prev: ['guide.live-inference', 'Live Inference Setup'],
  next: ['guide.custom-dash', 'Creating Custom Dashboards'],
  toc: ['overview', 'workflow'],
  tocLabels: ['Overview', 'Workflow'],
  body: `
<h2 id="overview">Overview</h2>
<p>The <strong>Run Store</strong> (bottom-left panel) keeps a history of offline graph executions. Each run stores its data, metadata, and results. You can switch between runs to compare different model configurations, hyperparameters, or data splits.</p>

<h2 id="workflow">Workflow</h2>
<ol>
  <li>Run your graph with configuration A → results are saved as Run 1</li>
  <li>Modify the Model node (e.g., change hidden width, add layers, adjust learning rate)</li>
  <li>Run again → saved as Run 2</li>
  <li>Click between runs in the Run Store widget to switch the dashboard and plots between results</li>
  <li>Compare prediction accuracy, loss values, and visual fit across runs</li>
</ol>
`
},

'guide.custom-dash': {
  section: 'Workflows & Guides',
  tier: 'pro',
  title: 'Creating Custom Dashboards',
  lede: 'Design a custom instrument dashboard from scratch.',
  prev: ['guide.model-compare', 'Model Comparison'],
  next: ['guide.scatter', 'Telemetry Analysis'],
  toc: ['overview', 'steps'],
  tocLabels: ['Overview', 'Steps'],
  body: `
<h2 id="overview">Overview</h2>
<p>Custom dashboards let you create personalized instrument layouts with exactly the gauges, meters, and displays you need for your analysis.</p>

<h2 id="steps">Steps</h2>
<ol>
  <li>Open <strong>Tools > Dash Library</strong> to launch the Dashboard Designer</li>
  <li>Drag elements from the palette: gauges for speed/RPM, bars for throttle/brake, a steering wheel, a minimap</li>
  <li>Double-click each element to bind it to a telemetry variable and set its range</li>
  <li>Arrange elements on the canvas: use snap-to-grid for alignment</li>
  <li>Save the layout with a descriptive name</li>
  <li>The layout appears in the Dashboard panel sidebar: click to load it</li>
  <li>Run a graph or start a live session: the dashboard updates automatically</li>
</ol>
`
},

'guide.scatter': {
  section: 'Workflows & Guides',
  tier: 'pro',
  title: 'Telemetry Analysis',
  lede: 'Use the scatter panel to explore variable relationships.',
  prev: ['guide.custom-dash', 'Creating Custom Dashboards'],
  next: ['config.preferences', 'Preferences'],
  toc: ['overview', 'examples'],
  tocLabels: ['Overview', 'Example Analyses'],
  body: `
<h2 id="overview">Overview</h2>
<p>The Scatter Panel (right column, below dashboard) plots variables against each other to reveal correlations, clusters, and outliers that aren't visible in time-series plots.</p>

<h2 id="examples">Example Analyses</h2>
<ul>
  <li><strong>G-G-V Diagram:</strong> X=LatAccel, Y=LongAccel, Z=Speed, shows the friction circle at every speed. Reveals traction limits and driving style.</li>
  <li><strong>Handling Envelope:</strong> X=Speed, Y=SteeringWheelAngle, Z=LatAccel, shows how much steering input produces how much lateral G at each speed.</li>
  <li><strong>Pedal Trace:</strong> X=Throttle, Y=Brake, Z=Speed, reveals trail braking technique and throttle/brake overlap.</li>
  <li><strong>Tire Performance:</strong> X=LFpressure, Y=LFtempM, Z=Speed, shows tire pressure vs temperature vs speed relationship.</li>
</ul>
<p>Use the scale spinboxes to normalize axes with different units for better visual comparison.</p>
`
},

// ─────────────────────────────────────────────────────────────────
// 08: CONFIGURATION
// ─────────────────────────────────────────────────────────────────

'config.preferences': {
  section: 'Configuration',
  title: 'Preferences',
  lede: 'Global application settings and per-node defaults.',
  prev: ['guide.scatter', 'Telemetry Analysis'],
  next: ['config.paths', 'File Paths & Libraries'],
  toc: ['overview', 'plot', 'units', 'nodes'],
  tocLabels: ['Overview', 'Plot Settings', 'Units', 'Node Defaults'],
  body: `
<h2 id="overview">Overview</h2>
<p>The Preferences dialog (Tools > Preferences) contains all global configuration organized in a tree-based multi-page layout. Each category has a "Reset to Default" button.</p>

<h2 id="plot">Plot Settings</h2>
<ul>
  <li><strong>Z-axis smoothing window</strong>: smoothing applied to 3D plot elevation</li>
  <li><strong>DLL usage</strong>: enable/disable ghost renderer and waterfall renderer DLLs</li>
  <li><strong>Plot tab reuse</strong>: whether new plots reuse existing tabs or create new ones</li>
  <li><strong>3D mouse button swap</strong>: swap left/right mouse button for 3D navigation</li>
</ul>

<h2 id="units">Units</h2>
<ul>
  <li><strong>Unit system</strong>: Imperial or Metric</li>
  <li><strong>Per-dimension overrides</strong>: customize units for speed, temperature, pressure, etc.</li>
</ul>

<h2 id="nodes">Node Defaults</h2>
<p>Default parameters for each node type, so new nodes start with your preferred configuration:</p>
<ul>
  <li><strong>Load Data:</strong> min laps, file conversion, segmentation, split mode/percentage</li>
  <li><strong>Model:</strong> device (CPU/CUDA), config view (basic/advanced)</li>
  <li><strong>Extract Set:</strong> default extraction template</li>
  <li><strong>Aux Math:</strong> default branch mode, channel</li>
  <li><strong>Filter:</strong> default method, window size</li>
  <li><strong>Output:</strong> LED defaults (Plot 2D, Track 3D)</li>
</ul>
`
},

'config.paths': {
  section: 'Configuration',
  title: 'File Paths & Libraries',
  lede: 'Configure where LapLabs stores and finds library files.',
  prev: ['config.preferences', 'Preferences'],
  next: ['config.account', 'License & Account'],
  toc: ['overview', 'paths'],
  tocLabels: ['Overview', 'Path Settings'],
  body: `
<h2 id="overview">Overview</h2>
<p>LapLabs uses several folder paths for storing and loading library files. These are configurable in Preferences.</p>

<h2 id="paths">Path Settings</h2>
<ul>
  <li><strong>Vehicle Library Folder</strong>: where vehicle model JSON files are stored</li>
  <li><strong>Track Library Folder</strong>: where track definition files are stored</li>
  <li><strong>Scope Library Folder</strong>: where scope config JSON files are saved</li>
  <li><strong>User Model Library</strong>: where Feature Wizard specs are saved</li>
  <li><strong>Dash Library Folder</strong>: where dashboard layout JSON files are stored</li>
</ul>
<p>All paths support <code>~</code> expansion for the user home directory.</p>
`
},

'config.account': {
  section: 'Configuration',
  title: 'License & Account',
  lede: 'Sign in, manage your license, and view account status.',
  prev: ['config.paths', 'File Paths & Libraries'],
  next: null,
  toc: ['overview'],
  tocLabels: ['Overview'],
  body: `
<h2 id="overview">Overview</h2>
<p>LapLabs Studio uses Clerk-based authentication for license management. The Account menu in the menu bar provides:</p>
<ul>
  <li><strong>Sign In</strong>: opens the Clerk sign-in flow</li>
  <li><strong>Sign Out</strong>: signs out of your account</li>
  <li><strong>License Info</strong>: displays your current license status and tier</li>
</ul>
<p>License status determines which features are available (some features may be gated by license tier).</p>
`
},

};
})();
