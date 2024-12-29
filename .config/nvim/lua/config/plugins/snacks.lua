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
  },
  config = function(_, opts)
    local snacks = require("snacks")
    snacks.setup(opts)

    -- KEYMAPS --

    -- Scratch Buffers
    vim.keymap.set("n", "<leader>sb", function()
      require("snacks").scratch()
    end, { desc = "Toggle [S]cratch [B]uffer" })
    vim.keymap.set("n", "<leader>S", function()
      require("snacks").scratch.select()
    end, { desc = "Select [S]cratch Buffer" })

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
