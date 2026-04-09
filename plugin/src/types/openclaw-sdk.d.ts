/**
 * OpenClaw Plugin SDK 类型声明
 * 
 * @module openclaw/plugin-sdk
 */

/**
 * 工具参数定义（TypeBox Schema）
 */
export type ToolParameterSchema = object;

/**
 * 工具定义
 */
export interface ToolDefinition {
  /** 工具名称 */
  name: string;
  /** 显示标签 */
  label?: string;
  /** 工具描述 */
  description?: string;
  /** 参数Schema */
  parameters: ToolParameterSchema;
  /** 执行函数 */
  execute: (toolCallId: string, params: Record<string, unknown>) => Promise<ToolResult>;
}

/**
 * 工具返回结果
 */
export interface ToolResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

/**
 * Plugin API
 */
export interface OpenClawPluginApi {
  /** 日志器 */
  logger: {
    info: (message: string, ...args: unknown[]) => void;
    warn: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
    debug: (message: string, ...args: unknown[]) => void;
  };
  
  /** 注册工具 */
  registerTool: (tool: ToolDefinition) => void;
  
  /** 获取配置 */
  getConfig: <T = unknown>() => T;
  
  /** 获取当前用户ID */
  getCurrentUserId?: () => string;
}

/**
 * Plugin入口定义
 */
export interface PluginEntry {
  /** Plugin ID */
  id: string;
  /** Plugin名称 */
  name: string;
  /** Plugin描述 */
  description?: string;
  /** 注册函数 */
  register: (api: OpenClawPluginApi) => void;
}

/**
 * 定义Plugin入口
 */
export function definePluginEntry(entry: PluginEntry): PluginEntry {
  return entry;
}
