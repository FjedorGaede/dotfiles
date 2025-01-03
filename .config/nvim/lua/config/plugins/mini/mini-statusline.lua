local function get_short_file_info()
  local filetype = vim.bo.filetype

  -- Don't show anything if there is no filetype
  if filetype == "" then
    return ""
  end

  local has_devicons, devicons = pcall(require, "nvim-web-devicons")
  if not has_devicons then
    return
  end
  local icon = devicons.get_icon(vim.fn.expand("%:t"), nil, { default = true })

  if filetype == "fzf" then -- fzf gets special treatment here
    filetype = "FZF"
    icon = ""
  end

  if filetype == "snacks_terminal" then
    local file_name = vim.fn.expand("%:t")

    if file_name == "lazygit" then -- lazygit gets special treatment here
      filetype = "lazygit"
      icon = ""
    end
  end

  return string.format("%s %s", icon, filetype)
end

return {
  "echasnovski/mini.statusline",
  opts = {
    use_icons = true,
    content = {
      active = function()
        local mode, mode_hl = MiniStatusline.section_mode({ trunc_width = 120 })
        local git = " " .. (vim.b and vim.b.minigit_summary and vim.b.minigit_summary.head_name or "")
        local diff = MiniStatusline.section_diff({ trunc_width = 75 })
        local diagnostics = MiniStatusline.section_diagnostics({ trunc_width = 75 })
        local filename = MiniStatusline.section_filename({ trunc_width = 140 })
        -- local fileinfo_long = MiniStatusline.section_fileinfo({ trunc_width = 140 })
        local fileinfo = get_short_file_info()
        -- local location = MiniStatusline.section_location({ trunc_width = 75 })
        -- local search = MiniStatusline.section_searchcount({ trunc_width = 75 })
        local reg = vim.fn.reg_recording()
        local macro = "@" .. reg
        -- local lsp = MiniStatusline.section_lsp({ trunc_width = 75 })

        local lsp_clients = vim.lsp.get_clients({ bufnr = vim.api.nvim_get_current_buf() })
        local lsp_client_names = {}
        for _, client in pairs(lsp_clients) do
          table.insert(lsp_client_names, client.name)
        end
        local lsp_client_name = "["
          .. (#lsp_client_names > 0 and table.concat(lsp_client_names, ", ") or "no lsps")
          .. "]"

        local groups = {
          { hl = mode_hl, strings = { mode } },
          { hl = "MiniStatuslineDevinfo", strings = { git, diff } },
          { hl = "MiniStatuslineDiagnostics", strings = { diagnostics } },
          "%<", -- Mark general truncate point
          { hl = "MiniStatuslineFilename", strings = { filename } },
          "%=", -- End left alignment
          { hl = "MiniStatuslineFileinfo", strings = { fileinfo, lsp_client_name } },
        }

        if reg ~= "" then
          table.insert(groups, { hl = "MiniStatuslineMacro", strings = { macro } })
        end

        return MiniStatusline.combine_groups(groups)
      end,
    },
  },
  config = function(_, opts)
    local statusline = require("mini.statusline")
    statusline.setup(opts)
  end,
}
