/**
 * 多Agent协同会议系统 - Plugin入口
 * 
 * @packageDocumentation
 */

import { definePluginEntry, type OpenClawPluginApi } from './types/openclaw-sdk.js';

// 会议生命周期工具
import { createMeetingCreateTool } from './tools/meeting-create.js';
import { createMeetingStartTool } from './tools/meeting-start.js';
import { createMeetingEndTool } from './tools/meeting-end.js';
import { createMeetingGetTool } from './tools/meeting-get.js';
import { createMeetingListTool } from './tools/meeting-list.js';

// 议程管理工具
import { 
  createAgendaAddItemTool, 
  createAgendaListItemsTool, 
  createAgendaNextItemTool 
} from './tools/agenda-tools.js';

// 发言协调工具
import {
  createSpeakingRequestTool,
  createSpeakingGrantTool,
  createSpeakingReleaseTool,
  createSpeakingStatusTool,
} from './tools/speaking-tools.js';

// 投票决策工具
import {
  createVotingCreateTool,
  createVotingCastTool,
  createVotingGetResultTool,
  createVotingEndTool,
  createVotingOverrideTool,
} from './tools/voting-tools.js';

// 会议记录工具
import {
  createRecordingTakeNoteTool,
  createRecordingTagInsightTool,
  createRecordingGetTranscriptTool,
} from './tools/recording-tools.js';

// 会议产出工具
import {
  createOutputGenerateSummaryTool,
  createOutputGenerateActionItemsTool,
  createOutputExportTool,
} from './tools/output-tools.js';

/**
 * Plugin入口定义
 */
export default definePluginEntry({
  id: 'meeting',
  name: 'Multi-Agent Meeting Plugin',
  description: '多Agent协同会议系统，支持头脑风暴、需求评审、技术评审、项目启动等场景',
  
  register(api: OpenClawPluginApi) {
    // 会议生命周期工具 (5)
    api.registerTool(createMeetingCreateTool(api));
    api.registerTool(createMeetingStartTool(api));
    api.registerTool(createMeetingEndTool(api));
    api.registerTool(createMeetingGetTool(api));
    api.registerTool(createMeetingListTool(api));
    
    // 议程管理工具 (3)
    api.registerTool(createAgendaAddItemTool(api));
    api.registerTool(createAgendaListItemsTool(api));
    api.registerTool(createAgendaNextItemTool(api));
    
    // 发言协调工具 (4)
    api.registerTool(createSpeakingRequestTool(api));
    api.registerTool(createSpeakingGrantTool(api));
    api.registerTool(createSpeakingReleaseTool(api));
    api.registerTool(createSpeakingStatusTool(api));
    
    // 投票决策工具 (5)
    api.registerTool(createVotingCreateTool(api));
    api.registerTool(createVotingCastTool(api));
    api.registerTool(createVotingGetResultTool(api));
    api.registerTool(createVotingEndTool(api));
    api.registerTool(createVotingOverrideTool(api));
    
    // 会议记录工具 (3)
    api.registerTool(createRecordingTakeNoteTool(api));
    api.registerTool(createRecordingTagInsightTool(api));
    api.registerTool(createRecordingGetTranscriptTool(api));
    
    // 会议产出工具 (3)
    api.registerTool(createOutputGenerateSummaryTool(api));
    api.registerTool(createOutputGenerateActionItemsTool(api));
    api.registerTool(createOutputExportTool(api));
    
    api.logger.info('Meeting plugin registered with 23 tools');
  },
});

// 导出类型供外部使用
export * from './types/index.js';
export { matchKeywords, structureMessages } from './modules/communication/message-structurer.js';
