--- This is taken from the examples of the lsp progress notification
---@type table<number, {token:lsp.ProgressToken, msg:string, done:boolean}[]>
local progress = vim.defaulttable()
vim.api.nvim_create_autocmd("LspProgress", {
  ---@param ev {data: {client_id: integer, params: lsp.ProgressParams}}
  callback = function(ev)
    local client = vim.lsp.get_client_by_id(ev.data.client_id)
    local value = ev.data.params.value --[[@as {percentage?: number, title?: string, message?: string, kind: "begin" | "report" | "end"}]]
    if not client or type(value) ~= "table" then
      return
    end
    local p = progress[client.id]

    for i = 1, #p + 1 do
      if i == #p + 1 or p[i].token == ev.data.params.token then
        p[i] = {
          token = ev.data.params.token,
          msg = ("[%3d%%] %s%s"):format(
            value.kind == "end" and 100 or value.percentage or 100,
            value.title or "",
            value.message and (" **%s**"):format(value.message) or ""
          ),
          done = value.kind == "end",
        }
        break
      end
    end

    local msg = {} ---@type string[]
    progress[client.id] = vim.tbl_filter(function(v)
      return table.insert(msg, v.msg) or not v.done
    end, p)

    local spinner = { "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏" }
    vim.notify(table.concat(msg, "\n"), "info", {
      id = "lsp_progress",
      title = client.name,
      opts = function(notif)
        notif.icon = #progress[client.id] == 0 and " "
          or spinner[math.floor(vim.uv.hrtime() / (1e6 * 80)) % #spinner + 1]
      end,
    })
  end,
})

return {
  "folke/snacks.nvim",
  ---@type snacks.Config
  opts = {
    indent = {
      enabled = true,
      animate = {
        enabled = false,
      },
    },
    lazygit = {
      enabled = true,
    },
    -- Does this even work?
    notifier = {
      enabled = true,
      timeout = 3000,
    },
    notify = {
      enabled = true,
    },
    quickfile = {
      enabled = true,
    },
    -- I actually find this smooth scrolling confusing
    scroll = {
      enabled = false,
    },
    statuscolumn = {
      enabled = false,
    },
    terminal = {
      enabled = false, -- Seems to be more work to integrate that I am currently eager to do
    },
    zen = {
      enabled = true, -- Not sure right now how to use this properly that it makes sense for me
    },
    styles = {
      zoom_indicator = {
        text = " Fullscreen",
      },
    },
    picker = {
      formatters = {
        file = {
          filename_first = true, -- display filename before the file path
        },
      },
    },
  },
  keys = {
    {
      "<leader>n",
      function()
        Snacks.notifier.show_history()
      end,
      desc = "Notification History",
    },
    {
      "<leader>fb",
      function()
        Snacks.picker.buffers()
      end,
      desc = "[F]ind [B]uffers",
    },
    {
      "<leader>fn",
      function()
        Snacks.picker.files({ cwd = vim.fn.stdpath("config") })
      end,
      desc = "[F]ind Co[n]fig File",
    },
    {
      "<leader>ff",
      function()
        Snacks.picker.files()
      end,
      desc = "[F]ind [F]iles",
    },
    {
      "<leader>fg",
      function()
        Snacks.picker.git_files()
      end,
      desc = "[F]ind [G]it Files",
    },
    {
      "<leader>fr",
      function()
        Snacks.picker.recent()
      end,
      desc = "[F]ind [R]ecent",
    },
    -- git
    {
      "<leader>gc",
      function()
        Snacks.picker.git_log()
      end,
      desc = "[G]it Log",
    },
    {
      "<leader>gs",
      function()
        Snacks.picker.git_status()
      end,
      desc = "[G]it [S]tatus",
    },
    -- Grep
    {
      "<leader>sb",
      function()
        Snacks.picker.lines()
      end,
      desc = "Buffer Lines",
    },
    {
      "<leader>sB",
      function()
        Snacks.picker.grep_buffers()
      end,
      desc = "Grep Open Buffers",
    },
    {
      "<leader>fs",
      function()
        Snacks.picker.grep()
      end,
      desc = "Grep",
    },
    {
      "<leader>fw",
      function()
        Snacks.picker.grep_word()
      end,
      desc = "Visual selection or word",
      mode = { "n", "x" },
    },
    -- search
    {
      '<leader>fR"',
      function()
        Snacks.picker.registers()
      end,
      desc = "Registers",
    },
    {
      "<leader>fa",
      function()
        Snacks.picker.autocmds()
      end,
      desc = "Autocmds",
    },
    {
      "<leader>fq",
      function()
        Snacks.picker.command_history()
      end,
      desc = "Command History",
    },
    {
      "<leader>sC",
      function()
        Snacks.picker.commands()
      end,
      desc = "Commands",
    },
    {
      "<leader>fd",
      function()
        Snacks.picker.diagnostics()
      end,
      desc = "Diagnostics",
    },
    {
      "<leader>fh",
      function()
        Snacks.picker.help()
      end,
      desc = "Help Pages",
    },
    {
      "<leader>fL",
      function()
        local lazypath = vim.fn.stdpath("data") .. "/lazy"
        ---@diagnostic disable-next-line: missing-fields
        Snacks.picker.files({ cwd = lazypath })
      end,
      desc = "[F]ind [L]azy Packages",
    },

    {
      "<leader>fH",
      function()
        Snacks.picker.highlights({
          confirm = function(picker, item)
            -- Put the first group name it finds into the defautl register
            local groupName = item.text:match('group%s*=%s*"([^"]+)"')
            vim.fn.setreg("+", groupName)
            picker:close()
          end,
        })
      end,
      desc = "Highlights",
    },
    {
      "<leader>fj",
      function()
        Snacks.picker.jumps()
      end,
      desc = "Jumps",
    },
    {
      "<leader>fk",
      function()
        Snacks.picker.keymaps()
      end,
      desc = "Keymaps",
    },
    {
      "<leader>fl",
      function()
        Snacks.picker.loclist()
      end,
      desc = "Location List",
    },
    {
      "<leader>fM",
      function()
        Snacks.picker.man()
      end,
      desc = "Man Pages",
    },
    {
      "<leader>fm",
      function()
        Snacks.picker.marks()
      end,
      desc = "Marks",
    },
    {
      "<leader>fR",
      function()
        Snacks.picker.resume()
      end,
      desc = "Resume",
    },
    {
      "<leader>fq",
      function()
        Snacks.picker.qflist()
      end,
      desc = "Quickfix List",
    },
    {
      "<leader>fC",
      function()
        Snacks.picker.colorschemes()
      end,
      desc = "Colorschemes",
    },
    {
      "<leader>fp",
      function()
        Snacks.picker.projects()
      end,
      desc = "Projects",
    },
    -- LSP
    {
      "gd",
      function()
        Snacks.picker.lsp_definitions()
      end,
      desc = "Goto Definition",
    },
    {
      "gr",
      function()
        Snacks.picker.lsp_references()
      end,
      nowait = true,
      desc = "References",
    },
    {
      "gI",
      function()
        Snacks.picker.lsp_implementations()
      end,
      desc = "Goto Implementation",
    },
    {
      "gy",
      function()
        Snacks.picker.lsp_type_definitions()
      end,
      desc = "Goto T[y]pe Definition",
    },
    {
      "<leader>ca",
      function()
        vim.lsp.buf.code_action()
      end,
      desc = "Code Action",
    },
    {
      "<leader>ss",
      function()
        Snacks.picker.lsp_symbols()
      end,
      desc = "LSP Symbols",
    },
  },
  config = function(_, opts)
    local snacks = require("snacks")
    snacks.setup(opts)

    -- KEYMAPS --
    -- REFACTOR: This can be done in the keys table as above

    -- Scratch Buffers
    -- vim.keymap.set("n", "<leader>sb", function()
    --   require("snacks").scratch()
    -- end, { desc = "Toggle [S]cratch [B]uffer" })
    -- vim.keymap.set("n", "<leader>S", function()
    --   require("snacks").scratch.select()
    -- end, { desc = "Select [S]cratch Buffer" })

    -- Zen
    vim.keymap.set("n", "<leader>z", function()
      require("snacks").zen.zoom()
    end, { desc = "Toggle [Z]en" })

    -- NOTE Fun little idea to have a scratch todo file for every project. But just a small idea
    -- setKey("<leader>t", function()
    --   local root = vim.lsp.buf.list_workspace_folders()
    --   require("snacks").scratch({ icon = " ", name = "Todo", ft = "markdown", file = root[1] .. "/.TODO.md" })
    -- end, "Todo List")

    -- Git
    vim.keymap.set("n", "<leader>gl", function()
      require("snacks").lazygit.open()
    end, { desc = "[L]azy[g]it Open" })
    vim.keymap.set("n", "<leader>gB", function()
      require("snacks").git.blame_line()
    end, { desc = "[G]it [B]lame Line" })
    vim.keymap.set("n", "<leader>gf", function()
      require("snacks").lazygit.log_file()
    end, { desc = "Lazygit Current File History" })
    vim.keymap.set("n", "<leader>gg", function()
      require("snacks").gitbrowse()
    end, { desc = "Open code in Browser" })
  end,
  init = function()
    vim.api.nvim_create_autocmd("User", {
      pattern = "VeryLazy",
      callback = function()
        local snacks = require("snacks")
        -- Setup some globals for debugging (lazy-loaded)
        _G.dd = function(...)
          snacks.debug.inspect(...)
        end

        _G.bt = function()
          snacks.debug.backtrace()
        end

        _G.log = function(...)
          snacks.debug.log(...)
        end

        vim.print = _G.dd -- Override print to use snacks for `:=` command
      end,
    })
  end,
}
